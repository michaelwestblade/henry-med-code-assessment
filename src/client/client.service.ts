import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { GetClientDto } from './dto/get-client.dto';
import { Prisma } from '@prisma/client';
import { GetClientBookingsDto } from './dto/get-client-bookings.dto';
import { ProviderBookingsService } from '../provider-bookings/provider-bookings.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly client: Client,
    private readonly providerBookingsService: ProviderBookingsService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    // check if provider already exists
    const emailInUse = await this.client.exists(createClientDto.email);

    if (emailInUse) {
      throw new BadRequestException(
        `Email already in use: ${createClientDto.email}`,
      );
    }

    return this.client.create(createClientDto);
  }

  findAll(filters: GetClientDto) {
    return this.client.findAll(filters);
  }

  async findOne(id: string) {
    try {
      const client = await this.client.findOne(id);
      return client;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Client with id ${id} not found`);
      }

      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue processing the request`,
      );
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.client.findOne(id);

    console.log(`Updating client with id ${id} and email ${client.email}`);

    try {
      return this.client.update(id, updateClientDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue updating the client with id ${id}`,
      );
    }
  }

  async remove(id: string) {
    const client = await this.client.findOne(id);

    console.log(`Removing client with id ${id} and email ${client.email}`);

    try {
      return this.client.delete(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue deleting the client with id ${id}`,
      );
    }
  }

  async getBookings(id: string, filters: GetClientBookingsDto) {
    const client = await this.client.findOne(id);

    console.log(
      `Fetching bookings for client with id ${id} and email ${client.email}`,
    );

    return this.providerBookingsService.findAllForClient(client.id, filters);
  }
}
