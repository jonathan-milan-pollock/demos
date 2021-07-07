import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { MediaState } from '@dark-rush-photography/shared/types';

@Injectable()
export class MediaStateValidationPipe
  implements PipeTransform<string, MediaState> {
  transform(mediaState: string): MediaState {
    const mediaStateKey = Object.keys(MediaState).find(
      (m) => m.toLowerCase() == mediaState.toLowerCase()
    );
    if (!mediaStateKey) {
      throw new BadRequestException(`Invalid Media State ${mediaState}`);
    }
    return mediaStateKey as MediaState;
  }
}
