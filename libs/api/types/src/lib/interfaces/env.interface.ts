export interface Env {
  readonly production: boolean;
  readonly drpApiAdminKey: string;
  readonly drpServerlessFunctionsKey: string;
  readonly mongoDbConnectionString: string;
}
