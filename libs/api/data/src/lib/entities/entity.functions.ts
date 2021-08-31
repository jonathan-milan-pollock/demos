import {
  Entity,
  EntityAdminDto,
  EntityCreateDto,
  EntityMinimalDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadComment } from '../content/comment.functions';
import { loadEmotion } from '../content/emotion.functions';
import { loadImage } from '../content/image.functions';
import { loadVideo } from '../content/video.functions';

export const loadNewEntity = (entityCreate: EntityCreateDto): Entity => ({
  type: entityCreate.type,
  group: entityCreate.group,
  slug: entityCreate.slug,
  order: 0,
  seoTitle: '',
  seoDescription: '',
  seoKeywords: [],
  location: {
    country: 'United States',
  },
  tileImageIsCentered: false,
  text: [],
  images: [],
  imageDimensions: [],
  videos: [],
  comments: [],
  emotions: [],
  isPosted: entityCreate.isPosted,
  isProcessing: false,
});

export const loadEntity = (documentModel: DocumentModel): EntityAdminDto => ({
  id: documentModel._id,
  type: documentModel.type,
  group: documentModel.group,
  slug: documentModel.slug,
  order: documentModel.order,
  seoTitle: documentModel.seoTitle,
  seoDescription: documentModel.seoDescription,
  seoKeywords: documentModel.seoKeywords,
  dateCreated: documentModel.dateCreated,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  tileImageIsCentered: documentModel.tileImageIsCentered,
  text: documentModel.text,
  comments: documentModel.comments.map(loadComment),
  emotions: documentModel.emotions.map(loadEmotion),
  images: documentModel.images.map(loadImage),
  video:
    documentModel.videos.length > 0
      ? documentModel.videos.map(loadVideo)[0]
      : undefined,
  isPosted: documentModel.isPosted,
  isProcessing: documentModel.isProcessing,
});

export const loadEntityMinimal = (
  documentModel: DocumentModel
): EntityMinimalDto => ({
  id: documentModel._id,
  type: documentModel.type,
  group: documentModel.group,
  slug: documentModel.slug,
});

export const loadDocumentModelsArray = (
  documentModels: DocumentModel | DocumentModel[]
): DocumentModel[] => {
  return Array.isArray(documentModels) ? documentModels : [documentModels];
};
