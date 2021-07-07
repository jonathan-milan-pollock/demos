import { AZURE_STORAGE_CONNECTION_STRING_DEV } from '@dark-rush-photography/shared-server/types';
import { Env } from '@dark-rush-photography/serverless/types';

export const loadDevEnvironment = (): Env => {
  return {
    production: false,
    azureStorageConnectionString: AZURE_STORAGE_CONNECTION_STRING_DEV,
  };
};
