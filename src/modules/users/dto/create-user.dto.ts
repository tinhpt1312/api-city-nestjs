import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  capitalid: number;

  @ApiProperty({
    type: Array,
  })
  roleid: number[];
}
