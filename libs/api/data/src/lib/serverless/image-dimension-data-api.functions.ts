import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { About } from '@dark-rush-photography/shared-types';
import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

export const findImageDimensionData$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  slug: string
): Observable<About> =>
  apiAuth$(envApiAuth, httpService).pipe(
    tap(() =>
      Logger.log(
        `Calling API ${envApi.drpApi}/admin/v1/about`,
        findImageDimensionData$.name
      )
    ),
    switchMap((authToken) =>
      httpService.post<About>(
        `${envApi.drpApi}/admin/v1/about`,
        {
          slug,
          images: [],
          videos: [],
        },
        {
          headers: {
            'x-functions-key': '',
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
