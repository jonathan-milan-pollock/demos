import { ConflictException } from '@nestjs/common';

import { Env } from '@dark-rush-photography/api/types';

export const loadEnvironment = (
  production: boolean,
  googleDriveClientEmail?: string,
  googleDrivePrivateKey?: string,
  googleDriveWebsitesWatermarkedFolderId?: string,
  googleDriveWebsitesWithoutWatermarkFolderId?: string,
  mongoDbConnectionString?: string,
  azureStorageConnectionString?: string,
  azureStorageConnectionStringPublic?: string,
  azureStorageBlobContainerNamePublic?: string,
  tinyPngApiKey?: string,
  ayrshareApiKey?: string
): Env => {
  if (!googleDriveClientEmail) {
    throw new ConflictException(
      'Please add NX_GOOGLE_DRIVE_CLIENT_EMAIL to environment variables'
    );
  }

  if (!googleDrivePrivateKey) {
    throw new ConflictException(
      'Please add NX_GOOGLE_DRIVE_PRIVATE_KEY to environment variables'
    );
  }

  if (!googleDriveWebsitesWatermarkedFolderId) {
    throw new ConflictException(
      'Please add NX_GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID to environment variables'
    );
  }

  if (!googleDriveWebsitesWithoutWatermarkFolderId) {
    throw new ConflictException(
      'Please add NX_GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID to environment variables'
    );
  }

  if (!mongoDbConnectionString) {
    throw new ConflictException(
      'Please add NX_MONGO_DB_CONNECTION_STRING to environment variables'
    );
  }

  if (!azureStorageConnectionString) {
    throw new ConflictException(
      'Please add AZURE_STORAGE_CONNECTION_STRING to environment variables'
    );
  }

  if (!azureStorageConnectionStringPublic) {
    throw new ConflictException(
      'Please add AZURE_STORAGE_CONNECTION_STRING_PUBLIC to environment variables'
    );
  }

  if (!azureStorageBlobContainerNamePublic) {
    throw new ConflictException(
      'Please add AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC to environment variables'
    );
  }

  if (!tinyPngApiKey) {
    throw new ConflictException(
      'Please add NX_TINY_PNG_API_KEY to environment variables'
    );
  }

  if (!ayrshareApiKey) {
    throw new ConflictException(
      'Please add NX_AYRSHARE_API_KEY to environment variables'
    );
  }

  return {
    production,
    googleDriveClientEmail,
    googleDrivePrivateKey,
    googleDriveWebsitesWatermarkedFolderId,
    googleDriveWebsitesWithoutWatermarkFolderId,
    mongoDbConnectionString,
    azureStorageConnectionStringPublic,
    azureStorageBlobContainerNamePublic,
    tinyPngApiKey,
    ayrshareApiKey,
  };
};
