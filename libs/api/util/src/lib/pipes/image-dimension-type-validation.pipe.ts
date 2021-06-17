import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { ImageDimensionType } from '@dark-rush-photography/shared-types';

@Injectable()
export class ImageDimensionTypeValidationPipe
  implements PipeTransform<string, ImageDimensionType> {
  transform(imageDimensionType: string): ImageDimensionType {
    const imageDimensionTypeKey = Object.keys(ImageDimensionType).find(
      (i) => i.toLowerCase() === imageDimensionType.toLowerCase()
    );
    if (!imageDimensionTypeKey) {
      throw new BadRequestException(
        `Invalid ImageDimensionType ${imageDimensionType}`
      );
    }
    return imageDimensionTypeKey as ImageDimensionType;
  }
}
