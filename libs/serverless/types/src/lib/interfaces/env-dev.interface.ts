import { ImageArtistExif } from './image-artist-exif.interface';
import { ImageDimension } from './image-dimension.interface';

export interface EnvDev {
  getImageArtistExifConfig(year: number): ImageArtistExif;
  readonly imageFitBackgroundColor: string;
  readonly imageDimensionsConfig: ImageDimension[];
  readonly azureStorageConnectionString: string;
}
