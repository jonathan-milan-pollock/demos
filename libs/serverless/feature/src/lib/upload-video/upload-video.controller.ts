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

import { UploadVideoService } from './upload-video.service';
import { EntityType } from '@dark-rush-photography/shared-types';

@Controller('upload-video')
export class UploadVideoController {
  constructor(private readonly uploadVideoService: UploadVideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Headers('x-entity-id') entityId: string,
    @Headers('x-entity-type') entityType: EntityType,
    @Headers('x-entity-group') entityGroup: string,
    @Headers('x-entity-slug') entitySlug: string,
    @Req() request: AzureRequest,
    @UploadedFile() video: Express.Multer.File
  ): Promise<void> {
    request.context.done(
      null,
      await this.uploadVideoService.upload(
        entityId,
        entityType,
        entityGroup,
        entitySlug,
        request,
        video
      )
    );
  }
}
