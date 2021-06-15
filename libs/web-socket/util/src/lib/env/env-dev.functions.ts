import { Env } from '@dark-rush-photography/web-socket/types';
import {
  AUTH0_AUDIENCE_DEV,
  AUTH0_TOKEN_API_DEV,
  DARK_RUSH_PHOTOGRAPHY_API_DEV,
} from '@dark-rush-photography/shared-server/types';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_AUTH0_CLIENT_ID) {
    throw new Error('Please add NX_AUTH0_CLIENT_ID to environment variables');
  }

  if (!process.env.NX_AUTH0_CLIENT_SECRET) {
    throw new Error(
      'Please add NX_AUTH0_CLIENT_SECRET to environment variables'
    );
  }

  if (!process.env.NX_DRP_ADMIN_KEY) {
    throw new Error('Please add NX_DRP_ADMIN_KEY to environment variables');
  }

  return {
    production: false,
    apiAuth: {
      auth0TokenApi: AUTH0_TOKEN_API_DEV,
      auth0Audience: AUTH0_AUDIENCE_DEV,
      auth0ClientId: process.env.NX_AUTH0_CLIENT_ID,
      auth0ClientSecret: process.env.NX_AUTH0_CLIENT_SECRET,
    },
    api: {
      darkRushPhotographyApi: DARK_RUSH_PHOTOGRAPHY_API_DEV,
      darkRushPhotographyAdminKey: process.env.NX_DRP_ADMIN_KEY,
    },
  };
};
