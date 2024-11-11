import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResgiterUserDto {
  @ApiProperty({
    description: `User name`,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional({
    description: `Password`,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: `email user`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
