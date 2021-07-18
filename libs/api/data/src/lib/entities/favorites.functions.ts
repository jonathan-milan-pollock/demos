import { Favorites, FavoritesDto } from '@dark-rush-photography/shared/types';
import {
  FAVORITES_SLUG,
  PublicContent,
} from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadMinimalPublicVideo, loadVideo } from '../content/video.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';
import { loadComment } from '../content/comment.functions';
import { loadEmotion } from '../content/emotion.functions';

export const loadNewFavorites = (): Favorites => ({
  slug: FAVORITES_SLUG,
  images: [],
  imageDimensions: [],
  videos: [],
  videoDimensions: [],
  comments: [],
  emotions: [],
});

export const loadFavorites = (documentModel: DocumentModel): Favorites => ({
  id: documentModel._id,
  slug: documentModel.slug,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
  videoDimensions: documentModel.videoDimensions.map(loadVideoDimension),
  comments: documentModel.comments.map(loadComment),
  emotions: documentModel.emotions.map(loadEmotion),
});

export const loadFavoritesPublic = (
  publicContent: PublicContent
): FavoritesDto => ({
  images: publicContent.images.map(loadMinimalPublicImage),
  videos: publicContent.videos.map(loadMinimalPublicVideo),
});
