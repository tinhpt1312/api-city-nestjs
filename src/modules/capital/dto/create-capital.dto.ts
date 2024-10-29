import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCapitalDto {
  @ApiProperty({
    description: `Name of the country's capital`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: `desciption of the city`,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: `services available in this city, enter service id`,
    type: [Number],
  })
  @IsNotEmpty()
  facilitiesId: number[];
}
