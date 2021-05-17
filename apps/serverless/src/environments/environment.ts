import { Env } from '@dark-rush-photography/serverless/types';
import { loadDevEnvironment } from '@dark-rush-photography/serverless/util';

export const environment: Env = loadDevEnvironment({
  production: false,
  azureStorageConnectionString:
    'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;',
});
