export interface Env {
  readonly production: boolean;
  readonly googleDriveClientEmail: string;
  readonly googleDrivePrivateKey: string;
  readonly googleDriveSharedWatermarkedFolderId: string;
  readonly googleDriveSharedWithoutWatermarkFolderId: string;
  readonly googleDriveWebsitesWatermarkedFolderId: string;
  readonly googleDriveWebsitesWithoutWatermarkFolderId: string;
  readonly googleDriveDarkRushPhotographySharedFolderId: string;
  readonly entityPushNotificationsAddress: string;
  readonly mongoDbConnectionString: string;
  readonly azureStorageConnectionStringPrivate: string;
  readonly azureStorageConnectionStringPublic: string;
  readonly azureStorageBlobContainerNamePrivate: string;
  readonly azureStorageBlobContainerNamePublic: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
}
