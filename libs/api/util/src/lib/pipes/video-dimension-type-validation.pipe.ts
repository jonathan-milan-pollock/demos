import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { VideoDimensionType } from '@dark-rush-photography/shared-types';

@Injectable()
export class VideoDimensionTypeValidationPipe
  implements PipeTransform<string, VideoDimensionType> {
  transform(videoDimensionType: string): VideoDimensionType {
    const videoDimensionTypeKey = Object.keys(VideoDimensionType).find(
      (v) => v.toLowerCase() === videoDimensionType.toLowerCase()
    );
    if (!videoDimensionTypeKey) {
      throw new BadRequestException(
        `Invalid VideoDimensionType ${videoDimensionType}`
      );
    }
    return videoDimensionTypeKey as VideoDimensionType;
  }
}
