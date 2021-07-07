import { Media } from '@dark-rush-photography/shared/types';
import { VideoArtistExif } from './video-artist-exif.interface';

export interface ServerlessCreateImageVideoRequest {
  readonly coverImage: Media;
  readonly images: Media[];
  readonly videoArtistExif: VideoArtistExif;
}
