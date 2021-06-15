import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';

export interface Env {
  readonly production: boolean;
  readonly apiAuth: EnvApiAuth;
  readonly drpApi: string;
}
