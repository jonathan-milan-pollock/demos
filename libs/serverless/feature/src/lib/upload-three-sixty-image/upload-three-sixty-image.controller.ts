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

import { EntityType } from '@dark-rush-photography/shared/types';
import { UploadThreeSixtyImageService } from './upload-three-sixty-image.service';

@Controller('upload-three-sixty-image')
export class UploadThreeSixtyImageController {
  constructor(
    private readonly uploadThreeSixtyImageService: UploadThreeSixtyImageService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadThreeSixtyImage(
    @Headers('x-entity-id') entityId: string,
    @Headers('x-entity-type') entityType: EntityType,
    @Headers('x-entity-group') entityGroup: string,
    @Headers('x-entity-slug') entitySlug: string,
    @Req() request: AzureRequest,
    @UploadedFile() threeSixtyImage: Express.Multer.File
  ): Promise<void> {
    request.context.done(
      null,
      await this.uploadThreeSixtyImageService.uploadThreeSixtyImage(
        entityId,
        entityType,
        entityGroup,
        entitySlug,
        request,
        threeSixtyImage
      )
    );
  }
}
