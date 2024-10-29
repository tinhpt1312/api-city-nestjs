import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFacilitiDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
