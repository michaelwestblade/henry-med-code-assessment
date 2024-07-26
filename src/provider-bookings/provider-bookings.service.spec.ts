import { Test, TestingModule } from '@nestjs/testing';
import { ProviderBookingsService } from './provider-bookings.service';

describe('ProviderBookingsService', () => {
  let service: ProviderBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderBookingsService],
    }).compile();

    service = module.get<ProviderBookingsService>(ProviderBookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
