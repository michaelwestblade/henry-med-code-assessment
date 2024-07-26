import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProvidersService {
  constructor(private readonly provider: Provider) {}

  async create(createProviderDto: CreateProviderDto) {
    // check if provider already exists
    const emailInUse = await this.provider.exists(createProviderDto.email);

    if (emailInUse) {
      throw new BadRequestException(
        `Email already in use: ${createProviderDto.email}`,
      );
    }

    return this.provider.create(createProviderDto);
  }

  findAll(filters) {
    return this.provider.findAll(filters);
  }

  async findOne(id: string) {
    try {
      const provider = await this.provider.findOne(id);
      return provider;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Provider with id ${id} not found`);
      }

      console.error(error);
      throw new InternalServerErrorException(
        `There was an issue processing the request`,
      );
    }
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.provider.findOne(id);

    console.log(`Updating provider with id ${id} and email ${provider.email}`);

    return this.provider.update(id, updateProviderDto);
  }

  async remove(id: string) {
    const provider = await this.provider.findOne(id);

    console.log(`Removing provider with id ${id} and email ${provider.email}`);

    return this.provider.delete(id);
  }
}
