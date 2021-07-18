import {
  BestOf,
  BestOfDto,
  BestOfType,
} from '@dark-rush-photography/shared/types';
import { PublicContent } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadComment } from '../content/comment.functions';
import { loadEmotion } from '../content/emotion.functions';

export const loadNewBestOf = (bestOfType: BestOfType): BestOf => ({
  slug: bestOfType,
  images: [],
  imageDimensions: [],
  comments: [],
  emotions: [],
});

export const loadBestOf = (documentModel: DocumentModel): BestOf => ({
  id: documentModel._id,
  slug: documentModel.slug,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  comments: documentModel.comments.map(loadComment),
  emotions: documentModel.emotions.map(loadEmotion),
});

export const loadBestOfPublic = (publicContent: PublicContent): BestOfDto => ({
  images: publicContent.images.map(loadMinimalPublicImage),
});
