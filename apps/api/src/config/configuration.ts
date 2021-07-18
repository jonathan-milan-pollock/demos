import { BadRequestException } from '@nestjs/common';

import { Env } from '@dark-rush-photography/api/types';

import {
  findImageResolution,
  findThreeSixtyImageResolution,
} from '@dark-rush-photography/shared/util';
import { findImageVideoResolution } from './image-video-resolutions.config';
import { findVideoResolution } from './video-resolutions.config';
import { findThreeSixtyVideoResolution } from './three-sixty-video-resolutions.config';
import { GET_IMAGE_ARTIST_EXIF } from './image-artist-exif.config';
import { GET_VIDEO_ARTIST_EXIF } from './video-artist-exif.config';
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
    findImageResolution,
    findThreeSixtyImageResolution,
    findImageVideoResolution,
    findVideoResolution,
    findThreeSixtyVideoResolution,
    getImageArtistExif: GET_IMAGE_ARTIST_EXIF,
    getVideoArtistExif: GET_VIDEO_ARTIST_EXIF,
  };
};
