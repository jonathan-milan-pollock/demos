import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureRequest } from '@nestjs/azure-func-http';

import { UploadLightroomImageService } from './upload-lightroom-image.service';

@Controller('upload-lightroom-image')
export class UploadLightroomImageController {
  constructor(
    private readonly uploadLightroomImageService: UploadLightroomImageService
  ) {}

  @Get()
  get(): string {
    return 'OK';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() request: AzureRequest,
    @UploadedFile() lightroomImage: Express.Multer.File
  ): Promise<void> {
    request.context.done(
      null,
      await this.uploadLightroomImageService.upload(request, lightroomImage)
    );
  }
}
