import { HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';

export const apiAuth$ = (
  envApiAuth: EnvApiAuth,
  httpService: HttpService
): Observable<string> =>
  httpService
    .post(
      envApiAuth.auth0TokenApi,
      {
        client_id: envApiAuth.auth0ClientId,
        client_secret: envApiAuth.auth0ClientSecret,
        audience: envApiAuth.auth0Audience,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data['access_token']));
