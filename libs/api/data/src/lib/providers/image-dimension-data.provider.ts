import { HttpService, Injectable } from '@nestjs/common';

import {
  ImageDimensionData,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';

@Injectable()
export class ImageDimensionDataProvider {
  constructor(private readonly httpService: HttpService) {}

  findImageDimensionData(
    imageDimensionType: ImageDimensionType,
    entityId: string,
    imageSlug: string
  ): ImageDimensionData {
    return {
      type: imageDimensionType,
      entityId,
      imageSlug: imageSlug,
      dataUri: '',
    };
  }
}
