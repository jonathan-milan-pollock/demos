import { HttpMethod } from '@auth0/auth0-angular';

import { Env } from '@dark-rush-photography/website/types';

export const environment: Env = {
  production: true,
  apiBaseUrl: '%%API_BASE_URL%%',
  auth: {
    domain: '%%AUTH_DOMAIN%%',
    clientId: '%%AUTH_CLIENT_ID%%',
    audience: '%%AUTH_AUDIENCE%%',
    httpInterceptor: {
      //TODO: Refine this list
      allowedList: [
        '/api/*',
        {
          uri: '/api/',
          httpMethod: HttpMethod.Get,
          allowAnonymous: true,
        },
      ],
    },
  },
};
