import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { GetClientDto } from './dto/get-client.dto';

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

  findOne(id: string) {
    return this.client.findOne(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const provider = await this.client.findOne(id);

    if (!provider) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return this.client.update(id, updateClientDto);
  }

  async remove(id: string) {
    const client = await this.client.findOne(id);

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return this.client.delete(id);
  }
}
