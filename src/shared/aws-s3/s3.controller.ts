import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AwsS3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/modules/auth/decorator';

@Controller('awss3')
@ApiTags('AWS-S3')
export class AwsS3Controller {
  constructor(private awsS3Service: AwsS3Service) {}

  @Public()
  @ApiOperation({ summary: 'Upload file to S3' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.awsS3Service.uploadFile(file);
  }

  @Public()
  @Get(':key')
  async getFiles(@Param('key') key: string, @Res() res: Response) {
    const fileStream = await this.awsS3Service.getFile(key);

    fileStream.pipe(res);
  }
}
