import { BadRequestException } from '@nestjs/common';

import { AZURE_STORAGE_CONNECTION_STRING_DEV } from '@dark-rush-photography/shared-server/types';
import {  Env } from '@dark-rush-photography/api/types';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_DRP_API_ADMIN_KEY) {
    throw new BadRequestException(
      'Please add NX_DRP_API_ADMIN_KEY to environment variables'
    );
  }

  if (!process.env.NX_MONGO_DB_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_MONGO_DB_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.NX_TINY_PNG_API_KEY) {
    throw new BadRequestException(
      'Please add NX_TINY_PNG_API_KEY to environment variables'
    );
  }

  if (!process.env.NX_AYRSHARE_API_KEY) {
    throw new BadRequestException(
      'Please add NX_AYRSHARE_API_KEY to environment variables'
    );
  }

  return {
    production: false,
    drpApiAdminKey: process.env.NX_DRP_API_ADMIN_KEY,
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
    azureStorageConnectionString: AZURE_STORAGE_CONNECTION_STRING_DEV,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
  };
};
