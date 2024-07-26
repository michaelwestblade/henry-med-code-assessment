import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UpdateClientDto {
  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  phoneNumber?: string;
}
