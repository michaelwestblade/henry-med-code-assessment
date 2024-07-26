import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UpdateProviderBookingDto {
  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.boolean().optional())
  confirmed?: boolean;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  bookedById?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  expiry?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.boolean().optional())
  expired?: boolean;
}
