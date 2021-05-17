import { Env } from '@dark-rush-photography/api/types';

export const environment: Env = {
  production: false,
  auth0Audience: 'https://www.darkrushphotography.com',
  auth0IssuerUrl: 'https://darkrushphotography.us.auth0.com/',
  mongoDbConnectionString: 'mongodb://localhost:27017/drp-mongo-db-database',
  azureStorageConnectionString:
    'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;',
};
