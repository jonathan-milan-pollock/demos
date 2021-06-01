import { AZURE_STORAGE_CONNECTION_STRING } from '@dark-rush-photography/shared-server-types';
import { Env } from '@dark-rush-photography/api/types';

export const environment: Env = {
  production: false,
  auth0Audience: 'https://www.darkrushphotography.com',
  auth0IssuerUrl: 'https://darkrushphotography.us.auth0.com/',
  mongoDbConnectionString: 'mongodb://localhost:27017/drp-mongo-db-database',
  azureStorageConnectionString: AZURE_STORAGE_CONNECTION_STRING,
};
