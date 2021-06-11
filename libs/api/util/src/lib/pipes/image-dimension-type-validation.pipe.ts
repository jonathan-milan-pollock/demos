import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { ImageDimensionType } from '@dark-rush-photography/shared-types';

@Injectable()
export class ImageDimensionTypeValidationPipe implements PipeTransform {
  transform(imageDimensionType: string): ImageDimensionType {
    switch (imageDimensionType.toLowerCase()) {
      case ImageDimensionType.Tile.toLowerCase():
        return ImageDimensionType.Tile;
      case ImageDimensionType.Thumbnail.toLowerCase():
        return ImageDimensionType.Thumbnail;
      case ImageDimensionType.Small.toLowerCase():
        return ImageDimensionType.Small;
      case ImageDimensionType.Medium.toLowerCase():
        return ImageDimensionType.Medium;
      case ImageDimensionType.Large.toLowerCase():
        return ImageDimensionType.Large;
      case ImageDimensionType.Facebook.toLowerCase():
        return ImageDimensionType.Facebook;
      case ImageDimensionType.Instagram.toLowerCase():
        return ImageDimensionType.Instagram;
      case ImageDimensionType.LinkedIn.toLowerCase():
        return ImageDimensionType.LinkedIn;
      case ImageDimensionType.GoogleBusiness.toLowerCase():
        return ImageDimensionType.GoogleBusiness;
      case ImageDimensionType.ThreeSixtyThumbnail.toLowerCase():
        return ImageDimensionType.ThreeSixtyThumbnail;
      case ImageDimensionType.ThreeSixtySmall.toLowerCase():
        return ImageDimensionType.ThreeSixtySmall;
      case ImageDimensionType.ThreeSixtyMedium.toLowerCase():
        return ImageDimensionType.ThreeSixtyMedium;
      case ImageDimensionType.ThreeSixtyLarge.toLowerCase():
        return ImageDimensionType.ThreeSixtyLarge;
      case ImageDimensionType.ThreeSixtyFacebook.toLowerCase():
        return ImageDimensionType.ThreeSixtyFacebook;
      case ImageDimensionType.ThreeSixtyInstagram.toLowerCase():
        return ImageDimensionType.ThreeSixtyInstagram;
      case ImageDimensionType.ThreeSixtyLinkedIn.toLowerCase():
        return ImageDimensionType.ThreeSixtyLinkedIn;
      case ImageDimensionType.ThreeSixtyGoogleBusiness.toLowerCase():
        return ImageDimensionType.ThreeSixtyGoogleBusiness;
      default:
        throw new BadRequestException(
          `Invalid ImageDimensionType ${imageDimensionType}`
        );
    }
  }
}
