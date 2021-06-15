import { Injectable } from '@nestjs/common';

import { Image } from '@dark-rush-photography/shared-types';

@Injectable()
export class ImageProvider {
  toImage(image: Image): Image {
    return {
      entityId: image.entityId,
      slug: image.slug,
      state: image.state,
      order: image.order,
      isStared: image.isStared,
      isLoved: image.isLoved,
      isLiked: image.isLiked,
      title: image.title,
      description: image.description,
      keywords: image.keywords,
      dateCreated: image.dateCreated,
      datePublished: image.datePublished,
    };
  }
}
