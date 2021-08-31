import { MediaProcess } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadVideo } from '../content/video.functions';

export const loadMediaProcess = (
  documentModel: DocumentModel
): MediaProcess => ({
  id: documentModel._id,
  slug: documentModel.slug,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
});
