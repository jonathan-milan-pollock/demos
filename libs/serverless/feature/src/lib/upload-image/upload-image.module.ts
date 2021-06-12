import { HttpModule, Module } from '@nestjs/common';

import { UploadImageActivityProvider } from '@dark-rush-photography/serverless/data';
import { UploadImageController } from './upload-image.controller';
import { UploadImageService } from './upload-image.service';

@Module({
  imports: [HttpModule],
  controllers: [UploadImageController],
  providers: [UploadImageActivityProvider, UploadImageService],
})
export class UploadImageModule {}
