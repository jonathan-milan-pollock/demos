import { EnvAuth } from './env-auth.interface';

export interface Env {
  readonly production: boolean;
  readonly apiBaseUrl: string;
  readonly auth: EnvAuth;
}
