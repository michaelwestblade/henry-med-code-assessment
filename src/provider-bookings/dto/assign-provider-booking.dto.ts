import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class AssignProviderBookingDto {
  @ApiProperty()
  @JoiSchema(Joi.string())
  clientId: string;
}
