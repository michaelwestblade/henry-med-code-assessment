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

@Controller('provider-bookings')
export class ProviderBookingsController {
  constructor(
    private readonly providerBookingsService: ProviderBookingsService,
  ) {}

  @Post()
  create(@Body() createProviderBookingDto: CreateProviderBookingDto) {
    return this.providerBookingsService.create(createProviderBookingDto);
  }

  @Get()
  findAll(@Query() filters: GetProviderBookingDto) {
    return this.providerBookingsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerBookingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProviderBookingDto: UpdateProviderBookingDto,
  ) {
    return this.providerBookingsService.update(id, updateProviderBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerBookingsService.remove(id);
  }

  @Post(':id/assign')
  assign(
    @Param('id') id: string,
    @Body() assignProviderBookingDto: AssignProviderBookingDto,
  ) {
    return this.providerBookingsService.assign(id, assignProviderBookingDto);
  }

  @Post(':id/confirm')
  confirm(
    @Param('id') id: string,
    @Body() confirmProviderBookingDto: ConfirmProviderBookingDto,
  ) {
    return this.providerBookingsService.confirm(id, confirmProviderBookingDto);
  }
}
