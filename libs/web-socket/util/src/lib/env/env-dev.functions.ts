import { Env } from '@dark-rush-photography/web-socket/types';
import { DRP_API_URL_DEV } from '@dark-rush-photography/shared-server/types';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_AUTH0_CLIENT_ID) {
    throw new Error('Please add NX_AUTH0_CLIENT_ID to environment variables');
  }

  if (!process.env.NX_AUTH0_CLIENT_SECRET) {
    throw new Error(
      'Please add NX_AUTH0_CLIENT_SECRET to environment variables'
    );
  }

  return {
    production: false,
    apiAuth: {
      auth0ClientId: process.env.NX_AUTH0_CLIENT_ID,
      auth0ClientSecret: process.env.NX_AUTH0_CLIENT_SECRET,
    },
    drpApiUrl: DRP_API_URL_DEV,
  };
};
