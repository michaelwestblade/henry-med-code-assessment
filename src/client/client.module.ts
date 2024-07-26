import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { PrismaModule } from '../prisma/prisma.module';
import { ProviderBookingsService } from '../provider-bookings/provider-bookings.service';
import { ProviderBookingsModule } from '../provider-bookings/provider-bookings.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService, Client],
  imports: [PrismaModule, ProviderBookingsModule],
})
export class ClientModule {}
