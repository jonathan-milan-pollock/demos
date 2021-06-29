import { DRP_API_URL_DEV } from '@dark-rush-photography/shared-server/types';
import {
  AZURE_STORAGE_CONNECTION_STRING_DEV,
  Env,
} from '@dark-rush-photography/serverless/types';
import { BadRequestException } from '@nestjs/common';

export const loadDevEnvironment = (): Env => {
  if (!process.env.NX_AUTH0_CLIENT_ID) {
    throw new BadRequestException(
      'Please add NX_AUTH0_CLIENT_ID to environment variables'
    );
  }

  if (!process.env.NX_AUTH0_CLIENT_SECRET) {
    throw new BadRequestException(
      'Please add NX_AUTH0_CLIENT_SECRET to environment variables'
    );
  }

  if (!process.env.NX_DRP_API_ADMIN_KEY) {
    throw new BadRequestException(
      'Please add DRP_API_ADMIN_KEY to environment variables'
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
    apiAuth: {
      auth0ClientId: process.env.NX_AUTH0_CLIENT_ID,
      auth0ClientSecret: process.env.NX_AUTH0_CLIENT_SECRET,
    },
    api: {
      drpApi: DRP_API_URL_DEV,
      drpApiAdminKey: process.env.NX_DRP_API_ADMIN_KEY,
    },
    azureStorageConnectionString: AZURE_STORAGE_CONNECTION_STRING_DEV,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
  };
};
