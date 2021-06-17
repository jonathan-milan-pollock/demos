import { Injectable } from '@nestjs/common';

import { ImageDimension } from '@dark-rush-photography/shared-types';

@Injectable()
export class ImageDimensionProvider {
  toImageDimension(videoDimension: ImageDimension): ImageDimension {
    return {
      entityId: videoDimension.entityId,
      imageSlug: videoDimension.imageSlug,
      type: videoDimension.type,
      state: videoDimension.state,
      pixels: videoDimension.pixels,
      settings: videoDimension.settings,
    };
  }
}
