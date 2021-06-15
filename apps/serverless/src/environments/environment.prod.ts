import { Env } from '@dark-rush-photography/serverless/types';

export const environment: Env = {
  production: true,
  apiAuth: {
    auth0ClientId: '%%AUTH0_CLIENT_ID%%',
    auth0ClientSecret: '%%AUTH0_CLIENT_SECRET%%',
  },
  api: {
    drpApi: '%%DARK_RUSH_PHOTOGRAPHY_API%%',
    drpAdminKey: '%%DRP_ADMIN_KEY%%',
  },
  azureStorageConnectionString: '%%AZURE_STORAGE_CONNECTION_STRING%%',
  tinyPngApiKey: '%%TINY_PNG_API_KEY%%',
  ayrshareApiKey: '%%AYRSHARE_API_KEY%%',
};
