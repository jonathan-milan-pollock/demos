import { Module } from '@nestjs/common';

import { ResizeImageProcessService } from '@dark-rush-photography/serverless/data';
import { ResizeImageController } from './resize-image.controller';
import { ResizeImageService } from './resize-image.service';

@Module({
  controllers: [ResizeImageController],
  providers: [ResizeImageProcessService, ResizeImageService],
})
export class ResizeImageModule {}
