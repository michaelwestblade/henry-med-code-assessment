import { PrismaService } from '../../prisma/prisma.service';
import { CreateProviderBookingDto } from '../dto/create-provider-booking.dto';
import { UpdateProviderBookingDto } from '../dto/update-provider-booking.dto';

export class ProviderBooking {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.providerBookings.findUnique({
      where: { id },
    });
  }

  findAll(filters) {
    return this.prisma.providerBookings.findMany({
      where: filters,
    });
  }

  async exists(providerId: string, startTime: string, endTime: string) {
    const count = await this.prisma.providerBookings.count({
      where: { providerId, startTime, endTime },
    });

    return count > 0;
  }

  create(createProviderBookingDto: CreateProviderBookingDto) {
    return this.prisma.providerBookings.create({
      data: {
        startTime: createProviderBookingDto.startTime,
        endTime: createProviderBookingDto.endTime,
        booked: false,
        expiry: new Date().toISOString(),
        confirmed: false,
        provider: {
          connect: {
            id: createProviderBookingDto.providerId,
          },
        },
      },
    });
  }

  update(id: string, updateProviderBookingDto: UpdateProviderBookingDto) {
    const args = { ...updateProviderBookingDto };

    if (updateProviderBookingDto.bookedById) {
      args['bookedBy'] = {
        connect: {
          id: updateProviderBookingDto.bookedById,
        },
      };
      delete args['bookedById'];
    }

    return this.prisma.providerBookings.update({
      where: { id },
      // @ts-ignore
      data: args,
    });
  }

  delete(id: string) {
    return this.prisma.providerBookings.delete({ where: { id } });
  }
}
