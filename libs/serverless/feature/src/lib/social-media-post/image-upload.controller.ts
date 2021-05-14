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
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { ImageUploadService } from './image-upload.service';

@Controller('image-upload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Get()
  getImageUpload(): string {
    return 'OK';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: AzureRequest
  ): Promise<void> {
    request.context.done(
      null,
      await this.imageUploadService.uploadImage(file, request)
    );
  }
}
