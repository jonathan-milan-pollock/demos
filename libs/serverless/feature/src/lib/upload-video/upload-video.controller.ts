import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureRequest } from '@nestjs/azure-func-http';

import { UploadVideoService } from './upload-video.service';

@Controller('upload-video')
export class UploadVideoController {
  constructor(private readonly uploadVideoService: UploadVideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() request: AzureRequest,
    @UploadedFile() image: Express.Multer.File
  ): Promise<void> {
    request.context.done(
      null,
      await this.uploadVideoService.upload(request, image)
    );
  }
}
