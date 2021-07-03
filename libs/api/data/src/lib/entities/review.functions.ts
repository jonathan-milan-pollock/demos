import { EntityType, Review } from '@dark-rush-photography/shared/types';
import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';

export const newReview = (slug: string): Review =>
  ({
    type: EntityType.Review,
    slug,
    isPublic: false,
    text: [],
    images: [],
    imageDimensions: [],
  } as Review);

export const reviewFromDocumentModel = (
  documentModel: DocumentModel
): Review => ({
  id: documentModel._id,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  text: documentModel.text,
  images: documentModel.images.map((image) => toImage(image)),
  imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
    toImageDimension(imageDimension)
  ),
});

export const reviewFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): Review => ({
  id: documentModel._id,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  text: documentModel.text,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
});
