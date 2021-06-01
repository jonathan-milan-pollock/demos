import { AZURE_STORAGE_CONNECTION_STRING } from '@dark-rush-photography/shared-server-types';
import { Env } from '@dark-rush-photography/serverless/types';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_TINY_PNG_API_KEY) {
    throw new Error('Please add NX_TINY_PNG_API_KEY to environment variables');
  }

  return {
    production: false,
    azureStorageConnectionString: AZURE_STORAGE_CONNECTION_STRING,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
  };
};
