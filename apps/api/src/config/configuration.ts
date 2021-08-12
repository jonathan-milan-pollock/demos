import { BadRequestException } from '@nestjs/common';

import { Env } from '@dark-rush-photography/api/types';
import {
  GET_CLIENTS_DROPBOX_REDIRECT_URI,
  GET_WEBSITES_DROPBOX_REDIRECT_URI,
} from './dropbox.config';
import {
  findImageResolution,
  findThreeSixtyImageResolution,
} from '@dark-rush-photography/shared/util';
import { GET_IMAGE_VIDEO_RESOLUTION } from './image-video-resolutions.config';
import { GET_VIDEO_RESOLUTION } from './video-resolutions.config';
import { GET_THREE_SIXTY_VIDEO_RESOLUTION } from './three-sixty-video-resolutions.config';
import { GET_IMAGE_ARTIST_EXIF } from './image-artist-exif.config';
import { GET_VIDEO_ARTIST_EXIF } from './video-artist-exif.config';
import { environment } from '../environments/environment';

export default (): Env => {
  if (!process.env.NX_WEBSITES_DROPBOX_CLIENT_ID) {
    throw new BadRequestException(
      'Please add NX_WEBSITES_DROPBOX_CLIENT_ID to environment variables'
    );
  }

  if (!process.env.NX_WEBSITES_DROPBOX_CLIENT_SECRET) {
    throw new BadRequestException(
      'Please add NX_WEBSITES_DROPBOX_CLIENT_SECRET to environment variables'
    );
  }

  if (!process.env.NX_CLIENTS_DROPBOX_CLIENT_ID) {
    throw new BadRequestException(
      'Please add NX_CLIENTS_DROPBOX_CLIENT_ID to environment variables'
    );
  }

  if (!process.env.NX_CLIENTS_DROPBOX_CLIENT_SECRET) {
    throw new BadRequestException(
      'Please add NX_CLIENTS_DROPBOX_CLIENT_SECRET to environment variables'
    );
  }

  if (!process.env.NX_MONGO_DB_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_MONGO_DB_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add AZURE_STORAGE_CONNECTION_STRING to environment variables'
    );
  }

  if (!process.env.NX_PRIVATE_BLOB_CONNECTION_STRING) {
    throw new BadRequestException(
      'Please add NX_PRIVATE_BLOB_CONNECTION_STRING to environment variables'
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

  if (!process.env.NX_LOGZIO_TOKEN) {
    throw new BadRequestException(
      'Please add NX_LOGZIO_TOKEN to environment variables'
    );
  }

  //TODO: Uppercase these
  return {
    production: environment.production,
    dropboxOwnerEmail: environment.dropboxOwner,
    websitesDropboxClientId: process.env.NX_WEBSITES_DROPBOX_CLIENT_ID,
    websitesDropboxClientSecret: process.env.NX_WEBSITES_DROPBOX_CLIENT_SECRET,
    clientsDropboxClientId: process.env.NX_CLIENTS_DROPBOX_CLIENT_ID,
    clientsDropboxClientSecret: process.env.NX_CLIENTS_DROPBOX_CLIENT_SECRET,
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
    privateBlobConnectionString: process.env.NX_PRIVATE_BLOB_CONNECTION_STRING,
    publicBlobConnectionString: process.env.NX_PUBLIC_BLOB_CONNECTION_STRING,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
    logzioToken: process.env.NX_LOGZIO_TOKEN,
    getWebsitesDropboxRedirectUri: GET_WEBSITES_DROPBOX_REDIRECT_URI,
    getClientsDropboxRedirectUri: GET_CLIENTS_DROPBOX_REDIRECT_URI,
    findImageResolution,
    findThreeSixtyImageResolution,
    findImageVideoResolution: GET_IMAGE_VIDEO_RESOLUTION,
    findVideoResolution: GET_VIDEO_RESOLUTION,
    findThreeSixtyVideoResolution: GET_THREE_SIXTY_VIDEO_RESOLUTION,
    getImageArtistExif: GET_IMAGE_ARTIST_EXIF,
    getVideoArtistExif: GET_VIDEO_ARTIST_EXIF,
  };
};
