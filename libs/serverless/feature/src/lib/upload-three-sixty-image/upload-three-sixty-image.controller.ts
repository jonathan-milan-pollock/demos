import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureRequest } from '@nestjs/azure-func-http';

import { UploadThreeSixtyImageService } from './upload-three-sixty-image.service';

@Controller('upload-three-sixty-image')
export class UploadThreeSixtyImageController {
  constructor(
    private readonly uploadThreeSixtyImageService: UploadThreeSixtyImageService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() request: AzureRequest,
    @UploadedFile() image: Express.Multer.File
  ): Promise<void> {
    request.context.done(
      null,
      await this.uploadThreeSixtyImageService.upload(request, image)
    );
  }
}
