import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateClientDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  phoneNumber: string;
}
