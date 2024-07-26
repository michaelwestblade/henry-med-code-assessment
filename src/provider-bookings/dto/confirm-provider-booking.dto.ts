import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class ConfirmProviderBookingDto {
  @ApiProperty()
  @JoiSchema(Joi.string())
  clientId: string;
}
