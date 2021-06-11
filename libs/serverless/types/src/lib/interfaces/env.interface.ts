export interface Env {
  readonly production: boolean;
  readonly darkRushPhotographyApi: string;
  readonly darkRushPhotographyAdminKey: string;
  readonly auth0TokenApi: string;
  readonly auth0Audience: string;
  readonly auth0ClientId: string;
  readonly auth0ClientSecret: string;
  readonly azureStorageConnectionString: string;
  readonly tinyPngApiKey: string;
}
