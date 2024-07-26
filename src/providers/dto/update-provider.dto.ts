import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UpdateProviderDto {
  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  phoneNumber?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.boolean().optional())
  active?: boolean;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.number().optional())
  appointmentLength?: number;
}
