import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateProviderBookingDto {
  @ApiProperty()
  @JoiSchema(Joi.string())
  startTime: string;

  @ApiProperty()
  @JoiSchema(Joi.string())
  endTime: string;
}
