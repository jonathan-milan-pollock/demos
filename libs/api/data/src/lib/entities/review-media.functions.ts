import {
  ReviewMedia,
  ReviewMediaDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadMinimalPublicVideo, loadVideo } from '../content/video.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';
import { PublicContent } from '@dark-rush-photography/api/types';

export const loadNewReviewMedia = (): ReviewMedia => ({
  images: [],
  imageDimensions: [],
  videos: [],
  videoDimensions: [],
});

export const loadReviewMedia = (documentModel: DocumentModel): ReviewMedia => ({
  id: documentModel._id,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
  videoDimensions: documentModel.videoDimensions.map(loadVideoDimension),
});

export const loadReviewMediaPublic = (
  publicContent: PublicContent
): ReviewMediaDto => ({
  images: publicContent.images.map(loadMinimalPublicImage),
  videos: publicContent.videos.map(loadMinimalPublicVideo),
});
