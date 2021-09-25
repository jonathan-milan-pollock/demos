export interface Env {
  readonly production: boolean;
  readonly googleDriveClientEmail: string;
  readonly googleDrivePrivateKey: string;
  readonly googleDriveWebsitesWatermarkedFolderId: string;
  readonly googleDriveWebsitesWithoutWatermarkFolderId: string;
  readonly mongoDbConnectionString: string;
  readonly azureStorageConnectionStringPublic: string;
  readonly azureStorageBlobContainerNamePublic: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
}
