import { DRP_SERVERLESS_URL_DEV, Env } from '@dark-rush-photography/api/types';
import { BadRequestException } from '@nestjs/common';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_DRP_API_ADMIN_KEY) {
    throw new BadRequestException(
      'Please add NX_DRP_API_ADMIN_KEY to environment variables'
    );
  }

  if (!process.env.NX_DRP_SERVERLESS_FUNCTIONS_KEY) {
    throw new BadRequestException(
      'Please add NX_DRP_SERVERLESS_FUNCTIONS_KEY to environment variables'
    );
  }

  if (!process.env.NX_MONGO_DB_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_MONGO_DB_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    throw new BadRequestException(
      'Please add APPINSIGHTS_INSTRUMENTATIONKEY to environment variables'
    );
  }

  return {
    production: false,
    drpApiAdminKey: process.env.NX_DRP_API_ADMIN_KEY,
    serverless: {
      url: DRP_SERVERLESS_URL_DEV,
      functionsKey: process.env.NX_DRP_SERVERLESS_FUNCTIONS_KEY,
    },
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
  };
};
