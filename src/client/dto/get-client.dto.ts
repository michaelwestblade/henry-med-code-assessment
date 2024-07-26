import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class GetClientDto {
  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  email?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  name?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  phoneNumber?: string;
}
