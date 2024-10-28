import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCapitalDto {
  @ApiProperty({
    description: `Name of the country's capital`,
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: `desciption of the city`,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: `services available in this city, enter service id`,
    type: Array,
  })
  facilitiesId: number[];
}
