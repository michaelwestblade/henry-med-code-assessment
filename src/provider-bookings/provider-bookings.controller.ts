import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProviderBookingsService } from './provider-bookings.service';
import { CreateProviderBookingDto } from './dto/create-provider-booking.dto';
import { UpdateProviderBookingDto } from './dto/update-provider-booking.dto';
import { GetProviderBookingDto } from './dto/get-provider-booking.dto';
import { AssignProviderBookingDto } from './dto/assign-provider-booking.dto';
import { ConfirmProviderBookingDto } from './dto/confirm-provider-booking.dto';

@Controller('providers/:providerId/provider-bookings/')
export class ProviderBookingsController {
  constructor(
    private readonly providerBookingsService: ProviderBookingsService,
  ) {}

  @Post()
  create(
    @Param('providerId') providerId: string,
    @Body() createProviderBookingDto: CreateProviderBookingDto,
  ) {
    return this.providerBookingsService.create(
      providerId,
      createProviderBookingDto,
    );
  }

  @Get()
  findAll(
    @Param('providerId') providerId: string,
    @Query() filters: GetProviderBookingDto,
  ) {
    return this.providerBookingsService.findAll(providerId, filters);
  }

  @Get(':id')
  findOne(@Param('providerId') providerId: string, @Param('id') id: string) {
    return this.providerBookingsService.findOne(providerId, id);
  }

  @Patch(':id')
  update(
    @Param('providerId') providerId: string,
    @Param('id') id: string,
    @Body() updateProviderBookingDto: UpdateProviderBookingDto,
  ) {
    return this.providerBookingsService.update(
      providerId,
      id,
      updateProviderBookingDto,
    );
  }

  @Delete(':id')
  remove(@Param('providerId') providerId: string, @Param('id') id: string) {
    return this.providerBookingsService.remove(providerId, id);
  }

  @Post(':id/assign')
  assign(
    @Param('providerId') providerId: string,
    @Param('id') id: string,
    @Body() assignProviderBookingDto: AssignProviderBookingDto,
  ) {
    return this.providerBookingsService.assign(
      providerId,
      id,
      assignProviderBookingDto,
    );
  }

  @Post(':id/confirm')
  confirm(
    @Param('providerId') providerId: string,
    @Param('id') id: string,
    @Body() confirmProviderBookingDto: ConfirmProviderBookingDto,
  ) {
    return this.providerBookingsService.confirm(
      providerId,
      id,
      confirmProviderBookingDto,
    );
  }
}
