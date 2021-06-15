import { Injectable } from '@nestjs/common';

import { ImageDimension } from '@dark-rush-photography/shared-types';

@Injectable()
export class ImageDimensionProvider {
  toImageDimension(imageDimension: ImageDimension): ImageDimension {
    return {
      entityId: imageDimension.entityId,
      imageSlug: imageDimension.imageSlug,
      type: imageDimension.type,
      state: imageDimension.state,
      pixels: imageDimension.pixels,
      settings: imageDimension.settings,
    };
  }
}
