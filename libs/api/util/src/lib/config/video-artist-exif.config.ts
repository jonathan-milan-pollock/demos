import { VideoArtistExif } from '@dark-rush-photography/shared/types';

export const GET_VIDEO_ARTIST_EXIF = (year: number): VideoArtistExif => ({
  author: 'Dark Rush Photography',
  year,
  copyright: `© ${year} Dark Rush Photography`,
});
