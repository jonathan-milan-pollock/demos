import { Module } from '@nestjs/common';

import { ExifImageModule } from './exif-image/exif-image.module';
import { PostImageModule } from './post-image/post-image.module';
import { ResizeImageModule } from './resize-image/resize-image.module';
import { SocialMediaPostImageModule } from './social-media-post-image/social-media-post-image.module';
import { TinifyImageModule } from './tinify-image/tinify-image.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { WebsitePostImageModule } from './website-post-image/website-post-image.module';

@Module({
  imports: [
    ExifImageModule,
    PostImageModule,
    ResizeImageModule,
    SocialMediaPostImageModule,
    TinifyImageModule,
    UploadImageModule,
    WebsitePostImageModule,
  ],
})
export class ServerlessFeatureModule {}
