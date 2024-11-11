import { Module } from '@nestjs/common';
import { AwsS3Controller } from './s3.controller';
import { AwsS3Service } from './s3.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  controllers: [AwsS3Controller],
  providers: [AwsS3Service],
  exports: [AwsS3Module],
})
export class AwsS3Module {}
