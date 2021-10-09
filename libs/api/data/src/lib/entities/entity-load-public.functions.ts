import {
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
  ImagePublic,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadImagePublic,
  loadLocation,
} from '../content/content-load.functions';
import { validateStarredImage } from '../content/content-validation.functions';

export const loadEntityMinimalPublic = (
  documentModel: DocumentModel
): EntityMinimalPublic => {
  const entityType = documentModel.type;
  const hasStarredImage =
    entityType === EntityType.Destination ||
    entityType === EntityType.Event ||
    entityType === EntityType.PhotoOfTheWeek;

  const publicImages = documentModel.images.filter(
    (image) => image.state === ImageState.Public
  );

  const starredImage = hasStarredImage
    ? loadImagePublic(validateStarredImage(publicImages))
    : ({} as ImagePublic);

  return {
    type: entityType,
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: documentModel.title ?? '',
    dateCreated: documentModel.dateCreated ?? '',
    datePublished: documentModel.datePublished ?? '',
    hasStarredImage,
    starredImageIsCentered: documentModel.starredImageIsCentered,
    starredImage,
  };
};

export const loadEntityPublic = (
  documentModel: DocumentModel
): EntityPublic => {
  const publicImages = documentModel.images.filter(
    (image) => image.state === ImageState.Public
  );
  return {
    type: documentModel.type,
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: documentModel.title ?? '',
    seoDescription: documentModel.seoDescription ?? '',
    seoKeywords: documentModel.seoKeywords,
    dateCreated: documentModel.dateCreated ?? '',
    datePublished: documentModel.datePublished ?? '',
    location: loadLocation(documentModel.location),
    text: documentModel.text,
    images: publicImages.map(loadImagePublic),
  };
};
