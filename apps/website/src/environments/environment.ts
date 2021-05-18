import { HttpMethod } from '@auth0/auth0-angular';
import { Env } from '@dark-rush-photography/website/types';

export const environment: Env = {
  production: false,
  apiBaseUrl: '',
  auth: {
    domain: 'auth.darkrushphotography.com',
    clientId: 'itlDBOCejY2AxCCR4qNZRnI1AUwWb9O3',
    audience: 'https://www.darkrushphotography.com',
    httpInterceptor: {
      //TODO: Refine this list
      allowedList: [
        {
          uri: '/api/',
          httpMethod: HttpMethod.Get,
          allowAnonymous: true,
        },
        '/api/*',
      ],
    },
  },
};
