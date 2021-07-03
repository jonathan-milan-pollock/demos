import { About, EntityType } from '@dark-rush-photography/shared/types';
import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';

export const newAbout = (slug: string): About =>
  ({
    type: EntityType.About,
    slug,
    isPublic: true,
    images: [],
    imageDimensions: [],
    videos: [],
    videoDimensions: [],
  } as About);

export const aboutFromDocumentModel = (
  documentModel: DocumentModel
): About => ({
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
});

export const aboutFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): About => ({
  id: documentModel._id,
  slug: documentModel.slug,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
  videos: publicContent.videos,
  videoDimensions: publicContent.videoDimensions,
});
