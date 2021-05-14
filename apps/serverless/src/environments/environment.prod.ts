import { Env } from '@dark-rush-photography/serverless/types';
import { getImageArtistExifConfig } from './image-artist-exif.config';
import { imageDimensionsConfig } from './image-dimensions.config';

export const environment = {
  production: true,
  env: {
    getImageArtistExifConfig,
    imageFitBackgroundColor: '',
    imageDimensionsConfig,
    azureStorageConnectionString: '%%AZURE_STORAGE_CONNECTION_STRING%%',
    tinyPngApiKey: '%%TINY_PNG_API_KEY%%',
  } as Env,
};
