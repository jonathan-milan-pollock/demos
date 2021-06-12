import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { ImageDimensionType } from '@dark-rush-photography/shared-types';

@Injectable()
export class ImageDimensionTypeValidationPipe
  implements PipeTransform<string, ImageDimensionType> {
  readonly imageDimensionTypeMap = new Map<string, ImageDimensionType>([
    ['tile', ImageDimensionType.Tile],
    ['thumbnail', ImageDimensionType.Thumbnail],
    ['small', ImageDimensionType.Small],
    ['medium', ImageDimensionType.Medium],
    ['large', ImageDimensionType.Large],
    ['facebook', ImageDimensionType.Facebook],
    ['instagram', ImageDimensionType.Instagram],
    ['linkedin', ImageDimensionType.LinkedIn],
    ['googlebusiness', ImageDimensionType.GoogleBusiness],
    ['threesixtythumbnail', ImageDimensionType.ThreeSixtyThumbnail],
    ['threesixtysmall', ImageDimensionType.ThreeSixtySmall],
    ['threesixtymedium', ImageDimensionType.ThreeSixtyMedium],
    ['threesixtylarge', ImageDimensionType.ThreeSixtyLarge],
    ['threesixtyfacebook', ImageDimensionType.ThreeSixtyFacebook],
    ['threesixtyinstagram', ImageDimensionType.ThreeSixtyInstagram],
    ['threesixtylinkedin', ImageDimensionType.ThreeSixtyLinkedIn],
    ['threesixtygooglebusiness', ImageDimensionType.ThreeSixtyGoogleBusiness],
  ]);
  transform(imageDimensionType: string): ImageDimensionType {
    const imageDimensionTypeEnum = this.imageDimensionTypeMap.get(
      imageDimensionType.toLowerCase()
    );
    if (!imageDimensionTypeEnum)
      throw new BadRequestException(
        `Invalid ImageDimensionType ${imageDimensionType}`
      );
    return imageDimensionTypeEnum;
  }
}
