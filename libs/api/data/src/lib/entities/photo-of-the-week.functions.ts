import {
  EntityType,
  PhotoOfTheWeek,
} from '@dark-rush-photography/shared/types';
import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toComment } from '../content/comment.functions';
import { toEmotion } from '../content/emotion.functions';

export const newPhotoOfTheWeek = (
  group: string,
  slug: string
): PhotoOfTheWeek =>
  ({
    type: EntityType.PhotoOfTheWeek,
    group,
    slug,
    isPublic: false,
    keywords: [],
    useTileImage: false,
    text: [],
    images: [],
    imageDimensions: [],
    videos: [],
    videoDimensions: [],
    comments: [],
    emotions: [],
  } as PhotoOfTheWeek);

export const photoOfTheWeekFromDocumentModel = (
  documentModel: DocumentModel
): PhotoOfTheWeek => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: documentModel.images.map((image) => toImage(image)),
  imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
    toImageDimension(imageDimension)
  ),
  comments: documentModel.comments.map((comment) => toComment(comment)),
  emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
});

export const photoOfTheWeekFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): PhotoOfTheWeek => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
  comments: publicContent.comments,
  emotions: publicContent.emotions,
});
