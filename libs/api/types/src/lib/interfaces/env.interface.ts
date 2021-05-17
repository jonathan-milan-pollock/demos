export interface Env {
  readonly production: boolean;
  readonly auth0Audience: string;
  readonly auth0IssuerUrl: string;
  readonly mongoDbConnectionString: string;
  readonly azureStorageConnectionString: string;
}
