import { EntityType, ReviewMedia } from '@dark-rush-photography/shared/types';
import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';

export const newReviewMedia = (): ReviewMedia =>
  ({
    type: EntityType.ReviewMedia,
    slug: 'media',
    isPublic: true,
    text: [],
    images: [],
    imageDimensions: [],
    videos: [],
    videoDimensions: [],
  } as ReviewMedia);

export const reviewMediaFromDocumentModel = (
  documentModel: DocumentModel
): ReviewMedia => ({
  id: documentModel._id,
  images: documentModel.images.map((image) => toImage(image)),
  imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
    toImageDimension(imageDimension)
  ),
  videos: documentModel.videos.map((video) => toVideo(video)),
  videoDimensions: documentModel.videoDimensions.map((videoDimension) =>
    toVideoDimension(videoDimension)
  ),
});

export const reviewMediaFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): ReviewMedia => ({
  id: documentModel._id,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
  videos: publicContent.videos,
  videoDimensions: publicContent.videoDimensions,
});
