import { AZURE_STORAGE_CONNECTION_STRING_DEV } from '@dark-rush-photography/shared-server-types';
import { Env } from '@dark-rush-photography/api/types';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_DRP_ADMIN_KEY) {
    throw new Error('Please add NX_DRP_ADMIN_KEY to environment variables');
  }

  if (!process.env.NX_MONGO_DB_CONNECTION_STRING) {
    throw new Error(
      'Please add NX_MONGO_DB_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    throw new Error(
      'Please add APPINSIGHTS_INSTRUMENTATIONKEY to environment variables'
    );
  }

  if (!process.env.NX_AYRSHARE_API_KEY) {
    throw new Error('Please add NX_AYRSHARE_API_KEY to environment variables');
  }

  return {
    production: false,
    darkRushPhotographyAdminKey: process.env.NX_DRP_ADMIN_KEY,
    auth0Audience: 'https://www.darkrushphotography.com',
    auth0IssuerUrl: 'https://auth.darkrushphotography.com/',
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
    azureStorageConnectionString: AZURE_STORAGE_CONNECTION_STRING_DEV,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
  };
};
