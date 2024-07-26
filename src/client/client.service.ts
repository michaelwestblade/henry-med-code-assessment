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

@Injectable()
export class ClientService {
  constructor(private readonly client: Client) {}

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

    return this.client.update(id, updateClientDto);
  }

  async remove(id: string) {
    const client = await this.client.findOne(id);

    console.log(`Removing client with id ${id} and email ${client.email}`);

    return this.client.delete(id);
  }
}
