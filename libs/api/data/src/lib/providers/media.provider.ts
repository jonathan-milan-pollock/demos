import { Injectable } from '@nestjs/common';

import { Media } from '@dark-rush-photography/shared-types';

@Injectable()
export class MediaProvider {
  toMedia(media: Media): Media {
    return {
      id: media.id,
      group: media.group,
      slug: media.slug,
      images: media.images,
      imageDimensions: media.imageDimensions,
      videos: media.videos,
      videoDimensions: media.videoDimensions,
    };
  }
}
