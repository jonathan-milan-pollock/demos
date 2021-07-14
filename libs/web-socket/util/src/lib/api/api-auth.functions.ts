import { HttpService } from '@nestjs/axios';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER,
} from '@dark-rush-photography/shared-server/types';
import { EnvApiAuth } from '@dark-rush-photography/web-socket/types';

export const apiAuth$ = (
  envApiAuth: EnvApiAuth,
  httpService: HttpService
): Observable<string> =>
  httpService
    .post(
      `${AUTH0_ISSUER}oauth/token`,
      {
        client_id: envApiAuth.auth0ClientId,
        client_secret: envApiAuth.auth0ClientSecret,
        audience: AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data['access_token']));
