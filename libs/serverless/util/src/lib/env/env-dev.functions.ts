import { AZURE_STORAGE_CONNECTION_STRING_DEV } from '@dark-rush-photography/shared-server-types';
import { Env } from '@dark-rush-photography/serverless/types';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_DRP_ADMIN_KEY) {
    throw new Error('Please add NX_DRP_ADMIN_KEY to environment variables');
  }

  if (!process.env.NX_AUTH0_CLIENT_ID) {
    throw new Error('Please add NX_AUTH0_CLIENT_ID to environment variables');
  }

  if (!process.env.NX_AUTH0_CLIENT_SECRET) {
    throw new Error(
      'Please add NX_AUTH0_CLIENT_SECRET to environment variables'
    );
  }

  if (!process.env.NX_TINY_PNG_API_KEY) {
    throw new Error('Please add NX_TINY_PNG_API_KEY to environment variables');
  }

  return {
    production: false,
    darkRushPhotographyApi: 'http://localhost:1111/api',
    darkRushPhotographyAdminKey: process.env.NX_DRP_ADMIN_KEY,
    auth0TokenApi: 'https://darkrushphotography.us.auth0.com/oauth/token',
    auth0Audience: 'https://www.darkrushphotography.com',
    auth0ClientId: process.env.NX_AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.NX_AUTH0_CLIENT_SECRET,
    azureStorageConnectionString: AZURE_STORAGE_CONNECTION_STRING_DEV,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
  };
};
