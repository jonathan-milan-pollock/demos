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

  return {
    production: false,
    drpAdminKey: process.env.NX_DRP_ADMIN_KEY,
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
  };
};
