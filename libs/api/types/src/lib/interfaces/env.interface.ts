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
  readonly privateAzureStorageConnectionString: string;
  readonly publicAzureStorageConnectionString: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
  getDropboxRedirectUri(protocol: string, host?: string): string;
  getImageArtistExif(
    copyrightYear: number,
    exifDateCreated: string
  ): ImageArtistExif;
  getVideoArtistExif(copyrightYear: number): VideoArtistExif;
}
