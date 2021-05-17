import { Env } from '@dark-rush-photography/api/types';

export const environment: Env = {
  production: true,
  auth0Audience: '%%AUTH0_AUDIENCE%%',
  auth0IssuerUrl: '%%AUTH0_ISSUER_URL%%',
  mongoDbConnectionString: '%%MONGO_DB_CONNECTION_STRING%%',
  azureStorageConnectionString: '%%AZURE_STORAGE_CONNECTION_STRING%%',
};
