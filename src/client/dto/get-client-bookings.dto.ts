import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class GetClientBookingsDto {
  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.boolean().optional())
  confirmed?: boolean;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.boolean().optional())
  expired?: boolean;
}
