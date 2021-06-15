import { Env } from '@dark-rush-photography/serverless/types';

export const environment: Env = {
  production: true,
  apiAuth: {
    auth0TokenApi: '%%AUTH0_TOKEN_API%%',
    auth0Audience: '%%AUTH0_AUDIENCE%%',
    auth0ClientId: '%%AUTH0_CLIENT_ID%%',
    auth0ClientSecret: '%%AUTH0_CLIENT_SECRET%%',
  },
  api: {
    darkRushPhotographyApi: '%%DARK_RUSH_PHOTOGRAPHY_API%%',
    darkRushPhotographyAdminKey: '%%DARK_RUSH_PHOTOGRAPHY_ADMIN_KEY%%',
  },
  azureStorageConnectionString: '%%AZURE_STORAGE_CONNECTION_STRING%%',
  tinyPngApiKey: '%%TINY_PNG_API_KEY%%',
};
