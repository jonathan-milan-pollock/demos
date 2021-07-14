export interface Env {
  readonly production: boolean;
  readonly mongoDbConnectionString: string;
  readonly privateBlobConnectionString: string;
  readonly privateTableConnectionString: string;
  readonly publicBlobConnectionString: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
  readonly logzioToken: string;
}
