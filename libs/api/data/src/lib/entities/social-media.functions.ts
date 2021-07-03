import { EntityType, SocialMedia } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';

export const newSocialMedia = (group: string, slug: string): SocialMedia =>
  ({
    type: EntityType.SocialMedia,
    group,
    slug,
    isPublic: true,
    images: [],
    imageDimensions: [],
    videos: [],
    videoDimensions: [],
  } as SocialMedia);

export const socialMediaFromDocumentModel = (
  documentModel: DocumentModel
): SocialMedia => ({
  id: documentModel._id,
  group: documentModel.group,
  slug: documentModel.slug,
  images: documentModel.images.map((image) => toImage(image)),
  imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
    toImageDimension(imageDimension)
  ),
  videos: documentModel.videos.map((video) => toVideo(video)),
  videoDimensions: documentModel.videoDimensions.map((videoDimension) =>
    toVideoDimension(videoDimension)
  ),
});
