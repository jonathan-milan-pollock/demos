import {
  ImageDimensionType,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { ImageResolution } from './image-resolution.interface';
import { ImageArtistExif } from './image-artist-exif.interface';
import { VideoResolution } from './video-resolution.interface';
import { VideoArtistExif } from './video-artist-exif.interface';

export interface Env {
  readonly production: boolean;
  readonly mongoDbConnectionString: string;
  readonly privateBlobConnectionString: string;
  readonly privateTableConnectionString: string;
  readonly publicBlobConnectionString: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
  readonly logzioToken: string;
  findImageResolution(imageDimensionType: ImageDimensionType): ImageResolution;
  findThreeSixtyImageResolution(
    imageDimensionType: ImageDimensionType
  ): ImageResolution;
  findImageVideoResolution(
    imageDimensionType: ImageDimensionType
  ): ImageResolution;
  findVideoResolution(videoDimensionType: VideoDimensionType): VideoResolution;
  findThreeSixtyVideoResolution(
    videoDimensionType: VideoDimensionType
  ): VideoResolution;
  getImageArtistExif(
    copyrightYear: number,
    exifDateCreated: string
  ): ImageArtistExif;
  getVideoArtistExif(copyrightYear: number): VideoArtistExif;
}
