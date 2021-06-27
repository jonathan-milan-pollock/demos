import { HttpService, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  MediaDimensionPixels,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';

import { Env, ActivityMedia } from '@dark-rush-photography/serverless/types';
import { addImageDimension$ } from '../functions/api-image-dimensions.functions';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

@Injectable()
export class ApiImageDimensionProvider {
  apiAddOrUpdateImageDimension$ = (
    env: Env,
    httpService: HttpService,
    activityMedia: ActivityMedia,
    type: ImageDimensionType,
    pixels: MediaDimensionPixels
  ): Observable<unknown> => {
    return apiAuth$(env.apiAuth, httpService).pipe(
      map((authToken) => {
        return addImageDimension$(
          env.api,
          httpService,
          authToken,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          activityMedia.entityId!,
          activityMedia.fileName,
          type,
          pixels
        );
      })
    );
  };
}
