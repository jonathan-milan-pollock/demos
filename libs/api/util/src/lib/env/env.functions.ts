import { BadRequestException } from '@nestjs/common';

import { Env } from '@dark-rush-photography/api/types';

export const loadEnvironment = (): Env => {
  if (!process.env.NX_MONGO_DB_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_MONGO_DB_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.NX_PRIVATE_BLOB_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_PRIVATE_BLOB_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.NX_PRIVATE_TABLE_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_PRIVATE_TABLE_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.NX_PUBLIC_BLOB_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_PUBLIC_BLOB_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.NX_DRP_API_ADMIN_KEY) {
    throw new BadRequestException(
      'Please add NX_DRP_API_ADMIN_KEY to environment variables'
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
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
    privateBlobConnectionString: process.env.NX_PRIVATE_BLOB_CONNECTION_STRING,
    privateTableConnectionString:
      process.env.NX_PRIVATE_TABLE_CONNECTION_STRING,
    publicBlobConnectionString: process.env.NX_PUBLIC_BLOB_CONNECTION_STRING,
    drpApiAdminKey: process.env.NX_DRP_API_ADMIN_KEY,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
  };
};
