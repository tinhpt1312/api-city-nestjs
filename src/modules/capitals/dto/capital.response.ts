import { Expose, Transform } from 'class-transformer';

export class CapitalResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.timestamp.createdBy.username)
  createdBy: string;

  @Expose()
  @Transform(({ obj }) => obj.timestamp.createdBy.id)
  createdById: number;
}
