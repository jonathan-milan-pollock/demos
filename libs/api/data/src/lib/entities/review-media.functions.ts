import { PublicContent } from '@dark-rush-photography/api/types';
import { ReviewMediaDto } from '@dark-rush-photography/shared/types';
import { loadMinimalPublicImage } from '../content/image.functions';
import { loadMinimalPublicVideo } from '../content/video.functions';

export const loadReviewMediaPublic = (
  publicContent: PublicContent
): ReviewMediaDto => ({
  images: publicContent.images.map(loadMinimalPublicImage),
  videos: publicContent.videos.map(loadMinimalPublicVideo),
});
