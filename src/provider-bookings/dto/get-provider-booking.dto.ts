import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class GetProviderBookingDto {
  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  providerId?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  bookedById?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  confirmed?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  startTime?: string;

  @ApiProperty({
    required: false,
  })
  @JoiSchema(Joi.string().optional())
  endTime?: string;
}
