import {
  Entity,
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
  ImagePublic,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImagePublic } from '../images/image-load.functions';
import { validateEntityStarredImage } from './entity-field-validation.functions';

export const loadEntityMinimalPublic = (
  entity: Entity
): EntityMinimalPublic => {
  const entityType = entity.type;
  //TODO:
  const hasStarredImage =
    entityType === EntityType.Destination ||
    entityType === EntityType.Event ||
    entityType === EntityType.PhotoOfTheWeek;

  const starredImage = hasStarredImage
    ? loadImagePublic(validateEntityStarredImage(entity))
    : ({} as ImagePublic);

  //TODO:
  const publicImages = entity.images.filter(
    (image) => image.state === ImageState.Public
  );

  return {
    type: entityType,
    group: entity.group,
    slug: entity.slug,
    order: entity.order,
    title: entity.title ?? '',
    createdDate: entity.createdDate ?? '',
    publishedDate: entity.publishedDate ?? '',
    hasStarredImage,
    starredImageIsCentered: entity.starredImageIsCentered,
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
    createdDate: documentModel.createdDate ?? '',
    publishedDate: documentModel.publishedDate ?? '',
    location: documentModel.location,
    text: documentModel.text,
    images: publicImages.map(loadImagePublic),
  };
};
