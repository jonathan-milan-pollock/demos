import { Env } from '@dark-rush-photography/serverless/types';

export const environment: Env = {
  production: true,
  azureStorageConnectionString: '%%AZURE_STORAGE_CONNECTION_STRING%%',
  tinyPngApiKey: '%%TINY_PNG_API_KEY%%',
};
