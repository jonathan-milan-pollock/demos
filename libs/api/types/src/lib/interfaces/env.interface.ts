import { EnvServerless } from './env-serverless.interface';

export interface Env {
  readonly production: boolean;
  readonly drpApiAdminKey: string;
  readonly serverless: EnvServerless;
  readonly mongoDbConnectionString: string;
}
