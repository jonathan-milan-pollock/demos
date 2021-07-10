import { EnvApiAuth } from './env-api-auth.interface';

export interface Env {
  readonly production: boolean;
  readonly drpApiUrl: string;
  readonly apiAuth: EnvApiAuth;
}
