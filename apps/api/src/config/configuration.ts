import { BadRequestException } from '@nestjs/common';

import { Env } from '@dark-rush-photography/api/types';
import { environment } from '../environments/environment';

export default (): Env => {
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

  if (!process.env.NX_AYRSHARE_API_KEY) {
    throw new BadRequestException(
      'Please add NX_AYRSHARE_API_KEY to environment variables'
    );
  }

  if (!process.env.NX_LOGZIO_TOKEN) {
    throw new BadRequestException(
      'Please add NX_LOGZIO_TOKEN to environment variables'
    );
  }

  return {
    production: environment.production,
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
    privateBlobConnectionString: process.env.NX_PRIVATE_BLOB_CONNECTION_STRING,
    privateTableConnectionString:
      process.env.NX_PRIVATE_TABLE_CONNECTION_STRING,
    publicBlobConnectionString: process.env.NX_PUBLIC_BLOB_CONNECTION_STRING,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
    logzioToken: process.env.NX_LOGZIO_TOKEN,
  };
};
