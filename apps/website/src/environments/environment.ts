import { Env } from '@dark-rush-photography/website/types';

export const environment: Env = {
  production: false,
  apiBaseUrl: '',
  auth: {
    domain: 'darkrushphotography.us.auth0.com',
    clientId: 'itlDBOCejY2AxCCR4qNZRnI1AUwWb9O3',
    redirectUri: 'http://localhost:4200/admin',
  },
};
