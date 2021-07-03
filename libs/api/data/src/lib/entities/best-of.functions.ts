import { BestOf, BestOfType } from '@dark-rush-photography/shared/types';
import { Content } from '@dark-rush-photography/api/types';
import { getEntityTypeFromBestOfType } from '@dark-rush-photography/shared/util';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toComment } from '../content/comment.functions';
import { toEmotion } from '../content/emotion.functions';

export const newBestOf = (bestOfType: BestOfType): BestOf =>
  ({
    type: getEntityTypeFromBestOfType(bestOfType),
    slug: bestOfType,
    isPublic: true,
    images: [],
    imageDimensions: [],
    comments: [],
    emotions: [],
  } as BestOf);

export const bestOfFromDocumentModel = (
  documentModel: DocumentModel
): BestOf => ({
  id: documentModel._id,
  slug: documentModel.slug,
  images: documentModel.images.map((image) => toImage(image)),
  imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
    toImageDimension(imageDimension)
  ),
  comments: documentModel.comments.map((comment) => toComment(comment)),
  emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
});

export const bestOfFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): BestOf => ({
  id: documentModel._id,
  slug: documentModel.slug,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
  comments: publicContent.comments,
  emotions: publicContent.emotions,
});
