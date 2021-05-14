import { ImageArtistExif } from './image-artist-exif.interface';
import { ImageDimension } from './image-dimension.interface';

export interface Env {
  getImageArtistExifConfig(year: number): ImageArtistExif;
  readonly imageFitBackgroundColor: string;
  readonly imageDimensionsConfig: ImageDimension[];
  readonly azureStorageConnectionString: string;
  readonly tinyPngApiKey: string;
}
