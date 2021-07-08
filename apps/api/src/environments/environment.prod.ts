import { Env } from '@dark-rush-photography/api/types';

export const environment: Env = {
  production: true,
  drpApiAdminKey: '%%DRP_API_ADMIN_KEY%%',
  mongoDbConnectionString: '%%MONGO_DB_CONNECTION_STRING%%',
  azureStorageConnectionString: '%%AZURE_STORAGE_CONNECTION_STRING%%',
  tinyPngApiKey: '%%TINY_PNG_API_KEY%%',
  ayrshareApiKey: '%%AYRSHARE_API_KEY%%',
};
