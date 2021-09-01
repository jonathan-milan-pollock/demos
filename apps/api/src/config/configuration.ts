import { BadRequestException } from '@nestjs/common';

import { Env } from '@dark-rush-photography/api/types';
import {
  FIND_IMAGE_RESOLUTION,
  FIND_THREE_SIXTY_IMAGE_RESOLUTION,
} from '@dark-rush-photography/shared/util';
import { FIND_VIDEO_RESOLUTION } from './video-resolutions.config';
import { GET_DROPBOX_REDIRECT_URI } from './dropbox-redirect.config';
import { GET_IMAGE_ARTIST_EXIF } from './image-artist-exif.config';
import { GET_VIDEO_ARTIST_EXIF } from './video-artist-exif.config';
import { environment } from '../environments/environment';

export default (): Env => {
  if (!process.env.NX_GOOGLE_DRIVE_CLIENT_EMAIL) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_CLIENT_EMAIL to environment variables'
    );
  }

  if (!process.env.NX_GOOGLE_DRIVE_PRIVATE_KEY) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_PRIVATE_KEY to environment variables'
    );
  }

  if (!process.env.NX_GOOGLE_DRIVE_CLIENTS_FOLDER_ID) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_CLIENTS_FOLDER_ID to environment variables'
    );
  }

  if (!process.env.NX_GOOGLE_DRIVE_WEBSITES_FOLDER_ID) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_WEBSITES_FOLDER_ID to environment variables'
    );
  }

  if (!process.env.NX_DROPBOX_EMAIL) {
    throw new BadRequestException(
      'Please add NX_DROPBOX_EMAIL to environment variables'
    );
  }

  if (!process.env.NX_DROPBOX_CLIENT_ID) {
    throw new BadRequestException(
      'Please add NX_DROPBOX_CLIENT_ID to environment variables'
    );
  }

  if (!process.env.NX_DROPBOX_CLIENT_SECRET) {
    throw new BadRequestException(
      'Please add NX_DROPBOX_CLIENT_SECRET to environment variables'
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

  if (!process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING_PUBLIC) {
    throw new BadRequestException(
      'Please add AZURE_STORAGE_BLOB_CONNECTION_STRING_PUBLIC to environment variables'
    );
  }

  if (!process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC) {
    throw new BadRequestException(
      'Please add AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC to environment variables'
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
    production: environment.production,
    googleDriveClientEmail: process.env.NX_GOOGLE_DRIVE_CLIENT_EMAIL,
    googleDrivePrivateKey: process.env.NX_GOOGLE_DRIVE_PRIVATE_KEY,
    googleDriveClientsFolderId: process.env.NX_GOOGLE_DRIVE_CLIENTS_FOLDER_ID,
    googleDriveWebsitesFolderId: process.env.NX_GOOGLE_DRIVE_WEBSITES_FOLDER_ID,
    dropboxEmail: process.env.NX_DROPBOX_EMAIL,
    dropboxClientId: process.env.NX_DROPBOX_CLIENT_ID,
    dropboxClientSecret: process.env.NX_DROPBOX_CLIENT_SECRET,
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
    azureStorageBlobConnectionStringPublic:
      process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING_PUBLIC,
    azureStorageBlobContainerNamePublic:
      process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
    findImageResolution: FIND_IMAGE_RESOLUTION,
    findThreeSixtyImageResolution: FIND_THREE_SIXTY_IMAGE_RESOLUTION,
    findVideoResolution: FIND_VIDEO_RESOLUTION,
    getDropboxRedirectUri: GET_DROPBOX_REDIRECT_URI,
    getImageArtistExif: GET_IMAGE_ARTIST_EXIF,
    getVideoArtistExif: GET_VIDEO_ARTIST_EXIF,
  };
};
