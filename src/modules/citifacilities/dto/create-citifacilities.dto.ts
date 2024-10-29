import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCityFacilityDto {
  @ApiProperty({
    description: 'This is number id of the facility match to capital',
  })
  @IsNotEmpty()
  @IsNumber()
  facilityId: number;

  @ApiProperty({
    description: 'This is number id of the city have a facility',
  })
  @IsNotEmpty()
  @IsNumber()
  capitalId: number;
}
