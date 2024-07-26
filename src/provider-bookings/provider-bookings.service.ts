import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderBookingDto } from './dto/create-provider-booking.dto';
import { UpdateProviderBookingDto } from './dto/update-provider-booking.dto';
import { ProviderBooking } from './entities/provider-booking.entity';
import { Prisma } from '@prisma/client';
import { AssignProviderBookingDto } from './dto/assign-provider-booking.dto';
import { ConfirmProviderBookingDto } from './dto/confirm-provider-booking.dto';

const DEFAULT_EXPIRY_IN_MINUTES = 30;
const DEFAULT_EXPIRY_IN_MILLIS = DEFAULT_EXPIRY_IN_MINUTES * 60000;

@Injectable()
export class ProviderBookingsService {
  constructor(private readonly providerBooking: ProviderBooking) {}

  async create(
    providerId: string,
    createProviderBookingDto: CreateProviderBookingDto,
  ) {
    // check  if provider booking already exists
    const bookingExists = await this.providerBooking.exists(
      providerId,
      createProviderBookingDto.startTime,
      createProviderBookingDto.endTime,
    );

    // if booking exists, throw an error
    if (bookingExists) {
      throw new BadRequestException(
        `Provider Booking already exists for provider ${providerId} with startTime ${createProviderBookingDto.startTime} and endTime ${createProviderBookingDto.endTime}`,
      );
    }

    // check if booking overlaps
    const overlappingBookings = await this.providerBooking.findAllInRange(
      providerId,
      createProviderBookingDto.startTime,
      createProviderBookingDto.endTime,
    );

    if (overlappingBookings.length > 0) {
      throw new BadRequestException(
        `There are ${overlappingBookings.length} Provider Bookings for provider ${providerId} within startTime ${createProviderBookingDto.startTime} and endTime ${createProviderBookingDto.endTime}`,
      );
    }

    return this.providerBooking.create(providerId, createProviderBookingDto);
  }

  findAll(providerId: string, filters) {
    return this.providerBooking.findAll({ providerId, ...filters });
  }

  findAllForClient(clientId, filters) {
    return this.providerBooking.findAll({ bookedById: clientId, ...filters });
  }

  async findOne(providerId: string, id: string) {
    try {
      const booking = await this.providerBooking.findOne(providerId, id);
      return booking;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Provider Booking with id ${id} not found`);
      }

      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue processing the request`,
      );
    }
  }

  async update(
    providerId: string,
    id: string,
    updateProviderBookingDto: UpdateProviderBookingDto,
  ) {
    const booking = await this.providerBooking.findOne(providerId, id);
    const now = new Date().toISOString();

    // if booking is already confirmed, do not allow updates
    if (booking.confirmed) {
      throw new BadRequestException(
        `Cannot update a confirmed booking with id ${id}`,
      );
    }

    // if booking is assigned to client and not expired, do not allow update
    if (
      booking.bookedById &&
      booking.expiry &&
      new Date(booking.expiry).toISOString() > now
    ) {
      throw new BadRequestException(
        `Unable to update provider booking with id ${id} and providerId ${booking.providerId} because it is awaiting client confirmation`,
      );
    }

    console.log(
      `Updating provider booking with id ${id} and providerId ${booking.providerId}`,
    );

    try {
      return this.providerBooking.update(id, updateProviderBookingDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue updating the provider booking with id ${id}`,
      );
    }
  }

  async remove(providerId: string, id: string) {
    const booking = await this.providerBooking.findOne(providerId, id);
    const now = new Date().toISOString();

    // if booking has been confirmed, do not allow deletion
    if (booking.confirmed) {
      throw new BadRequestException(
        `Unable to delete confirmed provider booking with id ${id} and providerId ${booking.providerId} because it is awaiting client confirmation`,
      );
    }

    // if booking is assigned to client and not expired, do not allow deletion
    if (
      booking.bookedById &&
      booking.expiry &&
      new Date(booking.expiry).toISOString() > now
    ) {
      throw new BadRequestException(
        `Unable to delete provider booking with id ${id} and providerId ${booking.providerId}`,
      );
    }

    // delete booking
    try {
      await this.providerBooking.delete(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue deleting the provider booking with id ${id}`,
      );
    }
  }

  async assign(
    providerId: string,
    id: string,
    assignProviderBookingDto: AssignProviderBookingDto,
  ) {
    const booking = await this.providerBooking.findOne(providerId, id);
    const now = new Date().toISOString();

    // if booking is already confirmed, do not allow confirmation
    if (booking.confirmed) {
      throw new BadRequestException(
        `Cannot assign booking with id ${id} because it is already confirmed`,
      );
    }

    // if booking is still awaiting confirmation before expiry, don't allow assignment
    if (
      !booking.expired &&
      booking.bookedById &&
      booking.expiry &&
      new Date(booking.expiry).toISOString() > now
    ) {
      throw new BadRequestException(
        `Booking with id ${id} cannot be reassigned because it is still awaiting client confirmation`,
      );
    }

    // if booking should expire, log a message
    // TODO implement chron to set the expired field and simplify this
    if (
      !booking.expired &&
      booking.bookedById &&
      booking.expiry &&
      new Date(booking.expiry).toISOString() < now
    ) {
      console.log(`Booking with id ${id} has expired, setting to defaults`);
    }

    // generate expiry
    const expiry = new Date(
      new Date().getTime() + DEFAULT_EXPIRY_IN_MILLIS,
    ).toISOString();

    // update booking with new client and expiry
    try {
      return this.providerBooking.update(id, {
        expiry,
        expired: false,
        confirmed: false,
        bookedById: assignProviderBookingDto.clientId,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue assigning the provider booking with id ${id} to client ${assignProviderBookingDto.clientId}`,
      );
    }
  }

  async confirm(
    providerId: string,
    id: string,
    confirmProviderBookingDto: ConfirmProviderBookingDto,
  ) {
    const booking = await this.providerBooking.findOne(providerId, id);
    const now = new Date().toISOString();

    // if booking is already confirmed, do not allow confirmation
    if (booking.confirmed) {
      throw new BadRequestException(
        `Cannot assign booking with id ${id} to client ${confirmProviderBookingDto.clientId} because it is already confirmed`,
      );
    }

    // if booking has already been reassigned, throw an error
    if (booking.bookedById !== confirmProviderBookingDto.clientId) {
      throw new BadRequestException(
        `Client ${confirmProviderBookingDto.clientId} cannot confirm booking ${id} because it is assigned to another client`,
      );
    }

    // if booking has expired, update booking and throw an error
    // TODO implement chron to set the expired field and simplify this
    if (
      !booking.expired &&
      booking.bookedById &&
      booking.expiry &&
      new Date(booking.expiry).toISOString() < now
    ) {
      await this.providerBooking.update(id, {
        expired: true,
      });
      throw new BadRequestException(
        `Client ${confirmProviderBookingDto.clientId} cannot confirm booking ${id} because it has expired`,
      );
    }

    // set booking to confirmed
    try {
      return this.providerBooking.update(id, {
        confirmed: true,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue confirming the provider booking with id ${id} for client ${confirmProviderBookingDto.clientId}`,
      );
    }
  }
}
