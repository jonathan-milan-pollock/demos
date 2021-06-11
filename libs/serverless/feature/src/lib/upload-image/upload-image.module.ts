import { HttpModule, Module } from '@nestjs/common';

import { UploadImageProcessService } from '@dark-rush-photography/serverless/data';
import { UploadImageController } from './upload-image.controller';
import { UploadImageService } from './upload-image.service';

@Module({
  imports: [HttpModule],
  controllers: [UploadImageController],
  providers: [UploadImageProcessService, UploadImageService],
})
export class UploadImageModule {}
