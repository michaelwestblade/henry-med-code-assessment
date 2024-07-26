import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateProviderDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  phoneNumber: string;

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
