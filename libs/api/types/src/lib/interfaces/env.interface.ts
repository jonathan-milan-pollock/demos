import {
  ImageDimensionType,
  ImageResolution,
  VideoDimensionType,
  VideoResolution,
} from '@dark-rush-photography/shared/types';
import { ImageArtistExif } from './image-artist-exif.interface';
import { VideoArtistExif } from './video-artist-exif.interface';

export interface Env {
  readonly production: boolean;
  readonly googleDriveClientEmail: string;
  readonly googleDrivePrivateKey: string;
  readonly googleDriveClientsFolderId: string;
  readonly googleDriveWebsitesFolderId: string;
  readonly dropboxEmail: string;
  readonly dropboxClientId: string;
  readonly dropboxClientSecret: string;
  readonly mongoDbConnectionString: string;
  readonly azureStorageBlobConnectionStringPublic: string;
  readonly azureStorageBlobContainerNamePublic: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
  findImageResolution(imageDimensionType: ImageDimensionType): ImageResolution;
  findThreeSixtyImageResolution(
    imageDimensionType: ImageDimensionType
  ): ImageResolution;
  findVideoResolution(videoDimensionType: VideoDimensionType): VideoResolution;
  getDropboxRedirectUri(protocol: string, host?: string): string;
  getImageArtistExif(
    copyrightYear: number,
    exifDateCreated: string
  ): ImageArtistExif;
  getVideoArtistExif(copyrightYear: number): VideoArtistExif;
}
