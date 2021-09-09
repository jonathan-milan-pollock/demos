import { BadRequestException } from '@nestjs/common';

import { Env } from '@dark-rush-photography/api/types';
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

  if (!process.env.NX_GOOGLE_DRIVE_SHARED_WATERMARKED_FOLDER_ID) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_SHARED_WATERMARKED_FOLDER_ID to environment variables'
    );
  }

  if (!process.env.NX_GOOGLE_DRIVE_SHARED_WITHOUT_WATERMARK_FOLDER_ID) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_SHARED_WITHOUT_WATERMARK_FOLDER_ID to environment variables'
    );
  }

  if (!process.env.NX_GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID to environment variables'
    );
  }

  if (!process.env.NX_GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID to environment variables'
    );
  }

  if (!process.env.NX_GOOGLE_DRIVE_DARK_RUSH_PHOTOGRAPHY_FOLDER_ID) {
    throw new BadRequestException(
      'Please add NX_GOOGLE_DRIVE_DARK_RUSH_PHOTOGRAPHY_FOLDER_ID to environment variables'
    );
  }

  if (!process.env.NX_ENTITY_PUSH_NOTIFICATIONS_ADDRESS) {
    throw new BadRequestException(
      'Please add NX_ENTITY_PUSH_NOTIFICATIONS_ADDRESS to environment variables'
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

  if (!process.env.AZURE_STORAGE_CONNECTION_STRING_PUBLIC) {
    throw new BadRequestException(
      'Please add AZURE_STORAGE_CONNECTION_STRING_PUBLIC to environment variables'
    );
  }

  if (!process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PRIVATE) {
    throw new BadRequestException(
      'Please add AZURE_STORAGE_BLOB_CONTAINER_NAME_PRIVATE to environment variables'
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
    googleDriveSharedWatermarkedFolderId:
      process.env.NX_GOOGLE_DRIVE_SHARED_WATERMARKED_FOLDER_ID,
    googleDriveSharedWithoutWatermarkFolderId:
      process.env.NX_GOOGLE_DRIVE_SHARED_WITHOUT_WATERMARK_FOLDER_ID,
    googleDriveWebsitesWatermarkedFolderId:
      process.env.NX_GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
    googleDriveWebsitesWithoutWatermarkFolderId:
      process.env.NX_GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
    googleDriveDarkRushPhotographyFolderId:
      process.env.NX_GOOGLE_DRIVE_DARK_RUSH_PHOTOGRAPHY_FOLDER_ID,
    entityPushNotificationsAddress:
      process.env.NX_ENTITY_PUSH_NOTIFICATIONS_ADDRESS,
    mongoDbConnectionString: process.env.NX_MONGO_DB_CONNECTION_STRING,
    azureStorageConnectionStringPrivate:
      process.env.AZURE_STORAGE_CONNECTION_STRING,
    azureStorageConnectionStringPublic:
      process.env.AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
    azureStorageBlobContainerNamePrivate:
      process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PRIVATE,
    azureStorageBlobContainerNamePublic:
      process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
    tinyPngApiKey: process.env.NX_TINY_PNG_API_KEY,
    ayrshareApiKey: process.env.NX_AYRSHARE_API_KEY,
  };
};
