import {
  ImageDimensionType,
  PhotoOfTheWeek,
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
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { findEntityComments, loadComment } from '../content/comment.functions';
import { findEntityEmotions, loadEmotion } from '../content/emotion.functions';

export const loadNewPhotoOfTheWeek = (
  group: string,
  slug: string
): PhotoOfTheWeek => ({
  group,
  slug,
  isPublic: false,
  order: 0,
  keywords: [],
  useTileImage: false,
  text: [],
  images: [],
  imageDimensions: [],
  comments: [],
  emotions: [],
});

export const loadPhotoOfTheWeek = (
  documentModel: DocumentModel
): PhotoOfTheWeek => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  order: documentModel.order,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  comments: documentModel.comments.map(loadComment),
  emotions: documentModel.emotions.map(loadEmotion),
});

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
