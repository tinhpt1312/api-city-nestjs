import { S3 } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
config();

export const AwsS3Configuration = new S3({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});
