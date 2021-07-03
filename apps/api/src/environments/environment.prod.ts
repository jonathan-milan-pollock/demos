import { Env } from '@dark-rush-photography/api/types';

export const environment: Env = {
  production: true,
  drpApiAdminKey: '%%DRP_API_ADMIN_KEY%%',
  serverless: {
    url: '%%DRP_SERVERLESS_URL%%',
    functionsKey: '%%DRP_SERVERLESS_FUNCTIONS_KEY%%',
  },
  mongoDbConnectionString: '%%MONGO_DB_CONNECTION_STRING%%',
};
