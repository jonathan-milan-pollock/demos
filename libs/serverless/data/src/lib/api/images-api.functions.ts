import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Env } from '@dark-rush-photography/serverless/types';
import { Image, PostedState } from '@dark-rush-photography/shared-types';
import { apiAuth$ } from './auth-api.functions';

const logContext = 'addImage$';
export const addImage$ = (
  env: Env,
  httpService: HttpService,
  entityId: string,
  imageName: string,
  createDate: string
): Observable<Image> =>
  apiAuth$(env, httpService).pipe(
    switchMap((authToken) => {
      Logger.log(
        `Calling API ${env.darkRushPhotographyApi}/admin/v1/images`,
        logContext
      );

      return httpService.put<Image>(
        `${env.darkRushPhotographyApi}/admin/v1/images`,
        {
          entityId,
          slug: imageName.substring(0, imageName.indexOf('.')),
          state: PostedState.New,
          order: 0,
          isStared: false,
          isLoved: false,
          isLiked: false,
          dateCreated:
            createDate.substring(0, 10).replace(/:/g, '-') + 'T00:00:00Z',
          imageDimensions: [],
          comments: [],
          emotions: [],
        } as Image,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            DRP_ADMIN_KEY: env.darkRushPhotographyAdminKey,
          },
        }
      );
    }),
    map((axiosResponse) => axiosResponse.data)
  );
