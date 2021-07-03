import { Module } from '@nestjs/common';

import { CreateAppleResourceModule } from './create-apple-resource/create-apple-resource.module';
import { CreateIconModule } from './create-icon/create-icon.module';
import { CreateImageVideoModule } from './create-image-video/create-image-video.module';
import { DataUriImageModule } from './data-uri-image/data-uri-image.module';
import { DataUriVideoModule } from './data-uri-video/data-uri-video.module';
import { DeleteModule } from './delete/delete.module';
import { DeleteEntityModule } from './delete-entity/delete-entity.module';
import { DeleteImageModule } from './delete-image/delete-image.module';
import { DeleteImageDimensionModule } from './delete-image-dimension/delete-image-dimension.module';
import { DeleteVideoModule } from './delete-video/delete-video.module';
import { DeleteVideoDimensionModule } from './delete-video-dimension/delete-video-dimension.module';
import { DimensionImageModule } from './dimension-image/dimension-image.module';
import { DimensionVideoModule } from './dimension-video/dimension-video.module';
import { ExifImageModule } from './exif-image/exif-image.module';
import { ExifVideoModule } from './exif-video/exif-video.module';
import { MediaProcessModule } from './media-process/media-process.module';
import { PostModule } from './post/post.module';
import { PostEntityModule } from './post-entity/post-entity.module';
import { PostImageModule } from './post-image/post-image.module';
import { PostImageDimensionModule } from './post-image-dimension/post-image-dimension.module';
import { PostVideoModule } from './post-video/post-video.module';
import { PostVideoDimensionModule } from './post-video-dimension/post-video-dimension.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { SocialMediaPostImageModule } from './social-media-post-image/social-media-post-image.module';
import { SocialMediaPostVideoModule } from './social-media-post-video/social-media-post-video.module';
import { TinifyImageModule } from './tinify-image/tinify-image.module';
import { UpdateModule } from './update/update.module';
import { UpdateEntityModule } from './update-entity/update-entity.module';
import { UpdateImageModule } from './update-image/update-image.module';
import { UpdateImageDimensionModule } from './update-image-dimension/update-image-dimension.module';
import { UpdateVideoModule } from './update-video/update-video.module';
import { UpdateVideoDimensionModule } from './update-video-dimension/update-video-dimension.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { UploadLightroomImageModule } from './upload-lightroom-image/upload-lightroom-image.module';
import { UploadThreeSixtyImageModule } from './upload-three-sixty-image/upload-three-sixty-image.module';

@Module({
  imports: [
    CreateAppleResourceModule,
    CreateIconModule,
    CreateImageVideoModule,
    DataUriImageModule,
    DataUriVideoModule,
    DeleteModule,
    DeleteEntityModule,
    DeleteImageModule,
    DeleteImageDimensionModule,
    DeleteVideoModule,
    DeleteVideoDimensionModule,
    DimensionImageModule,
    DimensionVideoModule,
    ExifImageModule,
    ExifVideoModule,
    MediaProcessModule,
    PostModule,
    PostEntityModule,
    PostImageModule,
    PostImageDimensionModule,
    PostVideoModule,
    PostVideoDimensionModule,
    SitemapModule,
    SocialMediaPostImageModule,
    SocialMediaPostVideoModule,
    TinifyImageModule,
    UpdateModule,
    UpdateEntityModule,
    UpdateImageModule,
    UpdateImageDimensionModule,
    UpdateVideoModule,
    UpdateVideoDimensionModule,
    UploadImageModule,
    UploadLightroomImageModule,
    UploadThreeSixtyImageModule,
  ],
})
export class ServerlessFeatureModule {}
