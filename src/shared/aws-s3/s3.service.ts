import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { awsS3Configuration } from 'src/config/aws';
import { Readable } from 'stream';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsS3Service {
  private bucketName = process.env.AWS_S3_PUBLIC_BUCKET;
  private regionName = process.env.AWS_S3_REGION;

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = extname(file.originalname);

    const fileName = `${uuid()}${fileExtension}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await awsS3Configuration.send(new PutObjectCommand(uploadParams));

    return `https://${this.bucketName}.s3.${this.regionName}.amazonaws.com/${fileName}`;
  }

  async getFile(key: string): Promise<Readable> {
    const getParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    const data = await awsS3Configuration.send(new GetObjectCommand(getParams));

    return data.Body as Readable;
  }

  // async getFile(key: string) {
  //   return `https://${this.bucketName}.s3.${this.regionName}.amazonaws.com/${key}`;
  // }
}
