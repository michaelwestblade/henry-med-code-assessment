import { Module } from '@nestjs/common';
import { ProviderBookingsService } from './provider-bookings.service';
import { ProviderBookingsController } from './provider-bookings.controller';
import { ProviderBooking } from './entities/provider-booking.entity';

@Module({
  controllers: [ProviderBookingsController],
  providers: [ProviderBookingsService, ProviderBooking],
})
export class ProviderBookingsModule {}
