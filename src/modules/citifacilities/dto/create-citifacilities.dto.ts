import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCityFacilityDto {
  @ApiProperty({
    description: 'This is number id of the facility match to capital',
  })
  @IsNumber()
  facilityId: number;

  @ApiProperty({
    description: 'This is number id of the city have a facility',
  })
  @IsNumber()
  capitalId: number;
}
