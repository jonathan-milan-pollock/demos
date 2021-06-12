import { HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Env } from '@dark-rush-photography/serverless/types';

export const apiAuth$ = (
  env: Env,
  httpService: HttpService
): Observable<string> =>
  httpService
    .post(
      env.auth0TokenApi,
      {
        client_id: env.auth0ClientId,
        client_secret: env.auth0ClientSecret,
        audience: env.auth0Audience,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data['access_token']));
