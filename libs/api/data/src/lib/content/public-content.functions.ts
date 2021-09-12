import { PublicContent } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { findPublicImageDimensions } from './image-dimension.functions';
import { findPublicImages } from './image.functions';
import { findPublicComments } from './comment.functions';
import { findPublicEmotions } from './emotion.functions';
export const loadPublicContent = (
  documentModel: DocumentModel
): PublicContent => {
  const publicImages = findPublicImages(documentModel.images);
  const publicImageIds = publicImages.map((image) => image.id);
  const publicImageDimensions = findPublicImageDimensions(
    documentModel.imageDimensions,
    publicImageIds
  );
  const publicComments = findPublicComments(documentModel.comments, [
    ...publicImageIds,
  ]);
  const publicEmotions = findPublicEmotions(
    documentModel.emotions,
    [...publicImageIds],
    publicComments.map((comment) => comment.id)
  );

  return {
    images: publicImages,
    imageDimensions: publicImageDimensions,
    comments: publicComments,
    emotions: publicEmotions,
  };
};
