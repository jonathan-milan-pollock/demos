import {
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { getEntityTypeFromMediaProcessType } from '@dark-rush-photography/shared/util';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';

export const newMediaProcess = (
  mediaProcessType: MediaProcessType,
  slug: string
): MediaProcess =>
  ({
    type: getEntityTypeFromMediaProcessType(mediaProcessType),
    slug,
    isPublic: false,
    images: [],
    imageDimensions: [],
    videos: [],
    videoDimensions: [],
  } as MediaProcess);

export const mediaProcessFromDocumentModel = (
  documentModel: DocumentModel
): MediaProcess => ({
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
