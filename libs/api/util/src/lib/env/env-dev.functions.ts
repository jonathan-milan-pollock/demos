import { Env } from '@dark-rush-photography/api/types';
import { DRP_SERVERLESS_URL_DEV } from '@dark-rush-photography/shared-server/types';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_DRP_API_ADMIN_KEY) {
    throw new Error('Please add NX_DRP_API_ADMIN_KEY to environment variables');
  }

  if (!process.env.NX_DRP_SERVERLESS_FUNCTIONS_KEY) {
    throw new Error(
      'Please add NX_DRP_SERVERLESS_FUNCTIONS_KEY to environment variables'
    );
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

  return {
    production: false,
    drpApiAdminKey: process.env.NX_DRP_API_ADMIN_KEY,
    serverless: {
      drpServerlessUrl: DRP_SERVERLESS_URL_DEV,
      drpServerlessFunctionsKey: process.env.NX_DRP_SERVERLESS_FUNCTIONS_KEY,
    },
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
  };
};
