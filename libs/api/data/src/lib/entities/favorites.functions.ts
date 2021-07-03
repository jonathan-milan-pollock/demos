import { EntityType, Favorites } from '@dark-rush-photography/shared/types';
import { FAVORITES_SLUG } from '@dark-rush-photography/shared-server/types';
import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';
import { toComment } from '../content/comment.functions';
import { toEmotion } from '../content/emotion.functions';

export const newFavorites = (): Favorites =>
  ({
    type: EntityType.Favorites,
    slug: FAVORITES_SLUG,
    isPublic: true,
    images: [],
    imageDimensions: [],
    videos: [],
    videoDimensions: [],
    comments: [],
    emotions: [],
  } as Favorites);

export const favoritesFromDocumentModel = (
  documentModel: DocumentModel
): Favorites => ({
  id: documentModel._id,
  slug: documentModel.slug,
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

export const favoritesFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): Favorites => ({
  id: documentModel._id,
  slug: documentModel.slug,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
  videos: publicContent.videos,
  videoDimensions: publicContent.videoDimensions,
  comments: publicContent.comments,
  emotions: publicContent.emotions,
});
