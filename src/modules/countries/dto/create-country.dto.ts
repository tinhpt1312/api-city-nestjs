import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({
    description: `Name of the country`,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: `The id number of the capital id matches this Country`,
    type: Number,
  })
  @IsNumber()
  capitalid: number;
}
