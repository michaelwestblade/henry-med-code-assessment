import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService, Client],
  imports: [PrismaModule],
})
export class ClientModule {}
