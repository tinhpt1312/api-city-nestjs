import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFacilitiDto {
  @ApiProperty()
  @IsString()
  name: string;
}
