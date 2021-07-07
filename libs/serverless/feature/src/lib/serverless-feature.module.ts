import { Module } from '@nestjs/common';

import { CreateImageVideoModule } from './create-image-video/create-image-video.module';
import { ExifVideoModule } from './exif-video/exif-video.module';
import { ResizeVideoModule } from './resize-video/resize-video.module';

@Module({
  imports: [CreateImageVideoModule, ExifVideoModule, ResizeVideoModule],
})
export class ServerlessFeatureModule {}
