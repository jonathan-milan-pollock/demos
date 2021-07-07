import { EnvApiAuth } from './env-api-auth.interface';

export interface Env {
  readonly production: boolean;
  readonly apiAuth: EnvApiAuth;
  readonly drpApiUrl: string;
}
