import { Injectable } from '@nestjs/common';

import { Video } from '@dark-rush-photography/shared-types';

@Injectable()
export class VideoProvider {
  toVideo(video: Video): Video {
    return {
      entityId: video.entityId,
      slug: video.slug,
      state: video.state,
      order: video.order,
      isStared: video.isStared,
      title: video.title,
      description: video.description,
      keywords: video.keywords,
      dateCreated: video.dateCreated,
      datePublished: video.datePublished,
    };
  }
}
