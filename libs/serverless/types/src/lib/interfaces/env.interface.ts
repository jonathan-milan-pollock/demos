import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { EnvApi } from './env-api.interface';

export interface Env {
  readonly production: boolean;
  readonly apiAuth: EnvApiAuth;
  readonly api: EnvApi;
  readonly azureStorageConnectionString: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
}
