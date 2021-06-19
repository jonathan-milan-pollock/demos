import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Image, PostedState } from '@dark-rush-photography/shared-types';
import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

export const addImage$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  entityId: string,
  imageName: string,
  createDate: string
): Observable<Image> =>
  apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) => {
      Logger.log(
        `Calling API ${envApi.drpApi}/admin/v1/images`,
        addImage$.name
      );

      return httpService.put<Image>(
        `${envApi.drpApi}/admin/v1/images`,
        {
          entityId,
          slug: imageName.substring(0, imageName.indexOf('.')),
          state: PostedState.New,
          order: 0,
          isStared: false,
          isLoved: false,
          isLiked: false,
          dateCreated: createDate.substring(0, 10),
          imageDimensions: [],
          comments: [],
          emotions: [],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
          },
        }
      );
    }),
    map((axiosResponse) => axiosResponse.data)
  );
