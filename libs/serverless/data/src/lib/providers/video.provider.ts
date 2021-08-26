import { Injectable, NotImplementedException } from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  EntityType,
  ImageDimensionType,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/serverless/types';

@Injectable()
export class VideoProvider {
  findData$(
    imageDimensionType: ImageDimensionType,
    entityId: string,
    entityType: EntityType,
    imageId: string,
    imageSlug: string,
    state: MediaState
  ): Observable<void> {
    throw new NotImplementedException();
  }
}
