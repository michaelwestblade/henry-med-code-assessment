import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { Provider } from './entities/provider.entity';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, Provider],
  imports: [PrismaModule],
})
export class ProvidersModule {}
