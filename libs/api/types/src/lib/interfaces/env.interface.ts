export interface Env {
  readonly production: boolean;
  readonly darkRushPhotographyAdminKey: string;
  readonly auth0Audience: string;
  readonly auth0IssuerUrl: string;
  readonly mongoDbConnectionString: string;
  readonly ayrshareApiKey: string;
}
