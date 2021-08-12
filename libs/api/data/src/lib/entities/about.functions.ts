import { AboutDto } from '@dark-rush-photography/shared/types';
import { PublicContent } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadMinimalPublicImage } from '../content/image.functions';
import { loadMinimalPublicVideo } from '../content/video.functions';

export const loadAboutPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): AboutDto => ({
  slug: documentModel.slug,
  order: documentModel.order,
  images: publicContent.images.map(loadMinimalPublicImage),
  videos: publicContent.videos.map(loadMinimalPublicVideo),
});
