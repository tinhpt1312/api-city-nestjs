import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
config();

class AwsS3Configuration {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  send(command: GetObjectCommand) {
    return this.s3.send(command);
  }
}
export const awsS3Configuration = new AwsS3Configuration();
