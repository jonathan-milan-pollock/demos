import { HttpModule, Module } from '@nestjs/common';

import { ResizeImageActivityProvider } from '@dark-rush-photography/serverless/data';
import { ResizeImageController } from './resize-image.controller';
import { ResizeImageService } from './resize-image.service';

@Module({
  imports: [HttpModule],
  controllers: [ResizeImageController],
  providers: [ResizeImageActivityProvider, ResizeImageService],
})
export class ResizeImageModule {}
