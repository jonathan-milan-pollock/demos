import { EnvApiAuth, EnvApi } from '@dark-rush-photography/shared-server/types';

export interface Env {
  readonly production: boolean;
  readonly apiAuth: EnvApiAuth;
  readonly api: EnvApi;
  readonly azureStorageConnectionString: string;
  readonly tinyPngApiKey: string;
}
