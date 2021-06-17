import { HttpService, Injectable } from '@nestjs/common';

import {
  VideoDimensionData,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';

@Injectable()
export class VideoDimensionDataProvider {
  constructor(private readonly httpService: HttpService) {}

  findVideoDimensionData(
    videoDimensionType: VideoDimensionType,
    entityId: string,
    imageSlug: string
  ): VideoDimensionData {
    return {
      type: videoDimensionType,
      entityId,
      videoSlug: imageSlug,
      dataUri: '',
    };
  }
}
