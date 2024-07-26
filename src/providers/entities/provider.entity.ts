import { PrismaService } from '../../prisma/prisma.service';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';

export class Provider {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.provider.findUnique({
      where: { id },
    });
  }

  findAll(filters) {
    return this.prisma.provider.findMany({
      where: filters,
    });
  }

  async exists(email: string) {
    const count = await this.prisma.provider.count({ where: { email } });

    return count > 0;
  }

  create(createProviderDto: CreateProviderDto) {
    return this.prisma.provider.create({
      data: createProviderDto,
    });
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    return this.prisma.provider.update({
      where: { id },
      data: updateProviderDto,
    });
  }

  delete(id: string) {
    return this.prisma.provider.delete({ where: { id } });
  }
}
