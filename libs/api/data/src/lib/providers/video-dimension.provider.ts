import { Injectable } from '@nestjs/common';

import { VideoDimension } from '@dark-rush-photography/shared-types';

@Injectable()
export class VideoDimensionProvider {
  toVideoDimension(videoDimension: VideoDimension): VideoDimension {
    return {
      entityId: videoDimension.entityId,
      videoSlug: videoDimension.videoSlug,
      type: videoDimension.type,
      state: videoDimension.state,
      pixels: videoDimension.pixels,
      settings: videoDimension.settings,
    };
  }
}
