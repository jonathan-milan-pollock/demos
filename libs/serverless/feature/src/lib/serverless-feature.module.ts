import { Module } from '@nestjs/common';

import { DimensionImageModule } from './dimension-image/dimension-image.module';
import { ExifImageModule } from './exif-image/exif-image.module';
import { PostImageModule } from './post-image/post-image.module';
import { SocialMediaPostImageModule } from './social-media-post-image/social-media-post-image.module';
import { TinifyImageModule } from './tinify-image/tinify-image.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { UploadLightroomImageModule } from './upload-lightroom-image/upload-lightroom-image.module';

@Module({
  imports: [
    ExifImageModule,
    PostImageModule,
    DimensionImageModule,
    SocialMediaPostImageModule,
    TinifyImageModule,
    UploadImageModule,
    UploadLightroomImageModule,
  ],
})
export class ServerlessFeatureModule {}
