import { Media } from '@dark-rush-photography/shared/types';
import { VideoArtistExif } from './video-artist-exif.interface';
import { VideoExif } from './video-exif.interface';

export interface ServerlessExifVideoRequest {
  readonly video: Media;
  readonly videoArtistExif: VideoArtistExif;
  readonly videoExif: VideoExif;
}
