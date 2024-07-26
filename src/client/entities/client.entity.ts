import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Injectable } from '@nestjs/common';
import { GetClientBookingsDto } from '../dto/get-client-bookings.dto';

@Injectable()
export class Client {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  findAll(filters) {
    return this.prisma.client.findMany({
      where: filters,
    });
  }

  async exists(email: string) {
    const count = await this.prisma.client.count({ where: { email } });

    return count > 0;
  }

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  delete(id: string) {
    return this.prisma.client.delete({ where: { id } });
  }
}
