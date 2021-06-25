import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { MediaType } from '@dark-rush-photography/shared-types';

@Injectable()
export class MediaTypeValidationPipe
  implements PipeTransform<string, MediaType> {
  transform(mediaType: string): MediaType {
    const mediaTypeKey = Object.keys(MediaType).find(
      (m) => m.toLowerCase() === mediaType.toLowerCase()
    );
    if (!mediaTypeKey) {
      throw new BadRequestException(`Invalid MediaType ${mediaType}`);
    }
    return mediaTypeKey as MediaType;
  }
}
