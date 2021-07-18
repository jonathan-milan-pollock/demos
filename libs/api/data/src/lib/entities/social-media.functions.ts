import { SocialMedia } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadVideo } from '../content/video.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';

export const loadNewSocialMedia = (
  group: string,
  slug: string
): SocialMedia => ({
  group,
  slug,
  images: [],
  imageDimensions: [],
  videos: [],
  videoDimensions: [],
});

export const loadSocialMedia = (documentModel: DocumentModel): SocialMedia => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
  videoDimensions: documentModel.videoDimensions.map(loadVideoDimension),
});
