import {
  ImageDimensionType,
  PhotoOfTheWeekDto,
  PhotoOfTheWeekMinimalDto,
} from '@dark-rush-photography/shared/types';
import { PublicContent } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityDatePublished,
  validateEntityDescription,
  validateEntityLocation,
  validateEntityTitle,
} from './entity-validation.functions';
import {
  validateFindImageDimension,
  validateFindStarredImage,
} from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { findEntityComments } from '../content/comment.functions';
import { findEntityEmotions } from '../content/emotion.functions';

export const loadMinimalPhotoOfTheWeekPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): PhotoOfTheWeekMinimalDto => {
  const starredImage = validateFindStarredImage(publicContent.images);
  return {
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: validateEntityTitle(documentModel),
    datePublished: validateEntityDatePublished(documentModel),
    useTileImage: documentModel.useTileImage,
    starredImage: validateFindStarredImage(publicContent.images),
    starredTileImageDimensions: validateFindImageDimension(
      starredImage.id,
      ImageDimensionType.Tile,
      publicContent.imageDimensions
    ),
  };
};

export const loadPhotoOfTheWeekPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): PhotoOfTheWeekDto => {
  const entityComments = findEntityComments(publicContent.comments);
  const entityEmotions = findEntityEmotions(
    publicContent.emotions,
    publicContent.comments
  );

  return {
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: validateEntityTitle(documentModel),
    description: validateEntityDescription(documentModel),
    keywords: documentModel.keywords,
    datePublished: validateEntityDatePublished(documentModel),
    location: validateEntityLocation(documentModel),
    text: documentModel.text,
    images: publicContent.images.map(loadMinimalPublicImage),
    comments: entityComments,
    emotions: entityEmotions,
  };
};
