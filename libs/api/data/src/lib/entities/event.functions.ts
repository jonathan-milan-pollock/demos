import {
  Event,
  EventMinimalDto,
  ImageDimensionType,
  EventDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadMinimalPublicVideo, loadVideo } from '../content/video.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';
import { findEntityComments, loadComment } from '../content/comment.functions';
import { findEntityEmotions, loadEmotion } from '../content/emotion.functions';
import { PublicContent } from '@dark-rush-photography/api/types';
import {
  validateEntityDateCreated,
  validateEntityDescription,
  validateEntityLocation,
  validateEntityTitle,
} from './entity-validation.functions';
import {
  validateFindImageDimension,
  validateFindStarredImage,
} from '../content/image-validation.functions';

export const loadNewEvent = (group: string, slug: string): Event => ({
  group,
  slug,
  isPublic: false,
  order: 0,
  keywords: [],
  useTileImage: false,
  text: [],
  images: [],
  imageDimensions: [],
  videos: [],
  videoDimensions: [],
  comments: [],
  emotions: [],
});

export const loadEvent = (documentModel: DocumentModel): Event => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  order: documentModel.order,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  dateCreated: documentModel.dateCreated,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
  videoDimensions: documentModel.videoDimensions.map(loadVideoDimension),
  comments: documentModel.comments.map(loadComment),
  emotions: documentModel.emotions.map(loadEmotion),
});

export const loadMinimalEventPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): EventMinimalDto => {
  const starredImage = validateFindStarredImage(publicContent.images);
  return {
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: validateEntityTitle(documentModel),
    useTileImage: documentModel.useTileImage,
    starredImage,
    starredTileImageDimensions: validateFindImageDimension(
      starredImage.id,
      ImageDimensionType.Tile,
      publicContent.imageDimensions
    ),
  };
};

export const loadEventPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): EventDto => {
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
    dateCreated: validateEntityDateCreated(documentModel),
    location: validateEntityLocation(documentModel),
    text: documentModel.text,
    images: publicContent.images.map(loadMinimalPublicImage),
    videos: publicContent.videos.map(loadMinimalPublicVideo),
    comments: entityComments,
    emotions: entityEmotions,
  };
};
