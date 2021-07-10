import { Env } from '@dark-rush-photography/web-socket/types';

export const loadEnvironment = (): Env => {
  // TODO: These should be web socket exceptions
  if (!process.env.NX_DRP_API_URL) {
    throw new Error('Please add NX_DRP_API_URL to environment variables');
  }

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
    drpApiUrl: process.env.NX_DRP_API_URL,
    apiAuth: {
      auth0ClientId: process.env.NX_AUTH0_CLIENT_ID,
      auth0ClientSecret: process.env.NX_AUTH0_CLIENT_SECRET,
    },
  };
};
