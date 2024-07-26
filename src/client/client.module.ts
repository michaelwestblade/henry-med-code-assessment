import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService, Client],
})
export class ClientModule {}
