import { Test, TestingModule } from '@nestjs/testing';
import { ProviderBookingsController } from './provider-bookings.controller';
import { ProviderBookingsService } from './provider-bookings.service';

describe('ProviderBookingsController', () => {
  let controller: ProviderBookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderBookingsController],
      providers: [ProviderBookingsService],
    }).compile();

    controller = module.get<ProviderBookingsController>(ProviderBookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
