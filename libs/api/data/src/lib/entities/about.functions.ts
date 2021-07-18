import { About, AboutDto } from '@dark-rush-photography/shared/types';
import { PublicContent } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadMinimalPublicVideo, loadVideo } from '../content/video.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';

export const loadNewAbout = (slug: string): About => ({
  slug,
  order: 0,
  images: [],
  imageDimensions: [],
  videos: [],
  videoDimensions: [],
});

export const loadAbout = (documentModel: DocumentModel): About => ({
  id: documentModel._id,
  slug: documentModel.slug,
  order: documentModel.order,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
  videoDimensions: documentModel.videoDimensions.map(loadVideoDimension),
});

export const loadAboutPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): AboutDto => ({
  slug: documentModel.slug,
  order: documentModel.order,
  images: publicContent.images.map(loadMinimalPublicImage),
  videos: publicContent.videos.map(loadMinimalPublicVideo),
});
