import { Module } from '@nestjs/common';
import { ProviderBookingsService } from './provider-bookings.service';
import { ProviderBookingsController } from './provider-bookings.controller';
import { ProviderBooking } from './entities/provider-booking.entity';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProviderBookingsController],
  providers: [ProviderBookingsService, ProviderBooking],
  imports: [PrismaModule],
  exports: [ProviderBookingsService],
})
export class ProviderBookingsModule {}
