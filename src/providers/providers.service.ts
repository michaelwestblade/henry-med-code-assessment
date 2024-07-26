import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

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

  findOne(id: string) {
    return this.provider.findOne(id);
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.provider.findOne(id);

    if (!provider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    }

    return this.provider.update(id, updateProviderDto);
  }

  async remove(id: string) {
    const provider = await this.provider.findOne(id);

    if (!provider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    }

    return this.provider.delete(id);
  }
}
