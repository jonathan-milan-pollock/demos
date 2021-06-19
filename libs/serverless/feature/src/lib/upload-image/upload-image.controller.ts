import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureRequest } from '@nestjs/azure-func-http';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

import { UploadImageService } from './upload-image.service';

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Get()
  get(): string {
    return 'OK';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Req() request: AzureRequest,
    @UploadedFile() image: Express.Multer.File
  ): Promise<void> {
    request.context.done(
      null,
      await this.uploadImageService.uploadImage(request, image)
    );
  }

  @Post(':type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageType(
    @Param('type') type: string,
    @Req() request: AzureRequest,
    @UploadedFile() image: Express.Multer.File
  ): Promise<void> {
    switch (type) {
      case '':
        request.context.done(
          null,
          await this.uploadImageService.uploadImage(request, image)
        );
    }
  }
}
