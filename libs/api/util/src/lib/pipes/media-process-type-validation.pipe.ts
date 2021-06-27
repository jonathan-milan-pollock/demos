import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { MediaProcessType } from '@dark-rush-photography/shared-types';

@Injectable()
export class MediaProcessTypeValidationPipe
  implements PipeTransform<string, MediaProcessType> {
  transform(mediaProcessType: string): MediaProcessType {
    const mediaProcessTypeKey = Object.keys(MediaProcessType).find(
      (m) => m.toLowerCase() === mediaProcessType.toLowerCase()
    );
    if (!mediaProcessTypeKey) {
      throw new BadRequestException(
        `Invalid MediaProcessType ${mediaProcessType}`
      );
    }
    return mediaProcessTypeKey as MediaProcessType;
  }
}
