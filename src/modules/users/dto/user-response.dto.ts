import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.timestamp.createdBy.username)
  createdBy: string;
}
