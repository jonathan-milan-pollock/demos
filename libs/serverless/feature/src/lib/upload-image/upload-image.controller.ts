import {
  Controller,
  Headers,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureRequest } from '@nestjs/azure-func-http';

import { EntityType } from '@dark-rush-photography/shared-types';
import { UploadImageService } from './upload-image.service';

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Headers('x-entity-id') entityId: string,
    @Headers('x-entity-type') entityType: EntityType,
    @Headers('x-entity-group') entityGroup: string,
    @Headers('x-entity-slug') entitySlug: string,
    @Req() request: AzureRequest,
    @UploadedFile() image: Express.Multer.File
  ): Promise<void> {
    request.context.done(
      null,
      await this.uploadImageService.upload(
        entityId,
        entityType,
        entityGroup,
        entitySlug,
        request,
        image
      )
    );
  }
}
