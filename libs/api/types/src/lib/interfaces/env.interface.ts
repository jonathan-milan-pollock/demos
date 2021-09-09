export interface Env {
  readonly production: boolean;
  readonly googleDriveClientEmail: string;
  readonly googleDrivePrivateKey: string;
  readonly googleDriveSharedWatermarkedFolderId: string;
  readonly googleDriveSharedWithoutWatermarkFolderId: string;
  readonly googleDriveWebsitesWatermarkedFolderId: string;
  readonly googleDriveWebsitesWithoutWatermarkFolderId: string;
  readonly googleDriveDarkRushPhotographyFolderId: string;
  readonly sharedPhotoAlbumPushNotificationAddress: string;
  readonly websitesEntityPushNotificationAddress: string;
  readonly mongoDbConnectionString: string;
  readonly azureStorageConnectionStringPrivate: string;
  readonly azureStorageConnectionStringPublic: string;
  readonly azureStorageBlobContainerName: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
}
