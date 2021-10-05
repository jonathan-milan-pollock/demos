import { VideoArtistExif } from '@dark-rush-photography/shared/types';

export const getVideoArtistExif = (year: number): VideoArtistExif => ({
  author: 'Dark Rush Photography',
  year,
  copyright: `© ${year} Dark Rush Photography`,
});
