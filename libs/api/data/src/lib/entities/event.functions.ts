import { Event, EntityType } from '@dark-rush-photography/shared/types';
import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';
import { toComment } from '../content/comment.functions';
import { toEmotion } from '../content/emotion.functions';

export const newEvent = (group: string, slug: string): Event =>
  ({
    type: EntityType.Event,
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
  } as Event);

export const eventFromDocumentModel = (
  documentModel: DocumentModel
): Event => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  dateCreated: documentModel.dateCreated,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: documentModel.images.map((image) => toImage(image)),
  imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
    toImageDimension(imageDimension)
  ),
  videos: documentModel.videos.map((video) => toVideo(video)),
  videoDimensions: documentModel.videoDimensions.map((videoDimension) =>
    toVideoDimension(videoDimension)
  ),
  comments: documentModel.comments.map((comment) => toComment(comment)),
  emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
});

export const eventFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): Event => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  dateCreated: documentModel.dateCreated,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
  videos: publicContent.videos,
  videoDimensions: publicContent.videoDimensions,
  comments: publicContent.comments,
  emotions: publicContent.emotions,
});
