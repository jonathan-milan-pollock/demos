import { FavoritesDto } from '@dark-rush-photography/shared/types';
import { PublicContent } from '@dark-rush-photography/api/types';
import { loadMinimalPublicImage } from '../content/image.functions';
import { loadMinimalPublicVideo } from '../content/video.functions';

export const loadFavoritesPublic = (
  publicContent: PublicContent
): FavoritesDto => ({
  images: publicContent.images.map(loadMinimalPublicImage),
  videos: publicContent.videos.map(loadMinimalPublicVideo),
});
