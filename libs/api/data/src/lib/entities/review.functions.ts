import { Review, ReviewDto } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { PublicContent } from '@dark-rush-photography/api/types';
import { validateEntityTitle } from './entity-validation.functions';
import { validateOneImage } from '../content/image-validation.functions';

export const loadNewReview = (slug: string): Review => ({
  slug,
  isPublic: false,
  order: 0,
  text: [],
  images: [],
  imageDimensions: [],
});

export const loadReview = (documentModel: DocumentModel): Review => ({
  id: documentModel._id,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  order: documentModel.order,
  title: documentModel.title,
  text: documentModel.text,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
});

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
