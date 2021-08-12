import { ReviewDto } from '@dark-rush-photography/shared/types';
import { PublicContent } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadMinimalPublicImage } from '../content/image.functions';
import { validateEntityTitle } from './entity-validation.functions';
import { validateOneImage } from '../content/image-validation.functions';

export const loadReviewPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): ReviewDto => {
  const validatedImage = validateOneImage(publicContent.images);
  return {
    slug: documentModel.slug,
    order: documentModel.order,
    title: validateEntityTitle(documentModel),
    text: documentModel.text,
    image: loadMinimalPublicImage(validatedImage),
  };
};
