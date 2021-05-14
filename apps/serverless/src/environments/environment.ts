import { getImageArtistExifConfig } from './image-artist-exif.config';
import { imageDimensionsConfig } from './image-dimensions.config';
import { loadDevEnvironment } from '@dark-rush-photography/serverless/util';

export const environment = {
  production: false,
  env: loadDevEnvironment({
    getImageArtistExifConfig,
    imageFitBackgroundColor: '',
    imageDimensionsConfig,
    azureStorageConnectionString:
      'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;',
  }),
};
