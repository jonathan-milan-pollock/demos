import {
  EntityMinimalPublic,
  EntityPublic,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { getEntityTypeHasStarredImage } from '@dark-rush-photography/shared/util';
import { DocumentModel } from '../schema/document.schema';
import { validatePublicStarredImage } from '../images/image-field-validation.functions';
import { loadImagePublic } from '../images/image-load.functions';

export const loadEntityMinimalPublic = (
  documentModel: DocumentModel
): EntityMinimalPublic => ({
  type: documentModel.type,
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  order: documentModel.order,
  title: documentModel.title ?? '',
  text: documentModel.text ?? '',
  createdDate: documentModel.createdDate ?? '',
  publishedDate: documentModel.publishedDate ?? '',
  starredImageIsCentered: documentModel.starredImageIsCentered,
  starredImage: getEntityTypeHasStarredImage(documentModel.type)
    ? loadImagePublic(validatePublicStarredImage(documentModel.images))
    : undefined,
  tileDimension: documentModel.tileDimension,
});

export const loadEntityPublic = (
  documentModel: DocumentModel
): EntityPublic => {
  const publicImages = documentModel.images.filter(
    (image) => image.state === ImageState.Public
  );
  return {
    type: documentModel.type,
    id: documentModel._id,
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: documentModel.title ?? '',
    text: documentModel.text ?? '',
    createdDate: documentModel.createdDate ?? '',
    publishedDate: documentModel.publishedDate ?? '',
    seoDescription: documentModel.seoDescription ?? '',
    seoKeywords: documentModel.seoKeywords,
    location: documentModel.location,
    images: publicImages.map(loadImagePublic),
  };
};
