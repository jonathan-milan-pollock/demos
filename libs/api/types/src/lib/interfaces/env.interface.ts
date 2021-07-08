export interface Env {
  readonly production: boolean;
  readonly drpApiAdminKey: string;
  readonly mongoDbConnectionString: string;
  readonly azureStorageConnectionString: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
}
