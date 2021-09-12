import {
  Entity,
  EntityAdminDto,
  EntityCreate,
  EntityMinimalDto,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadComment } from '../content/comment.functions';
import { loadEmotion } from '../content/emotion.functions';
import { loadImage } from '../content/image.functions';
import { loadVideo } from '../content/video.functions';

export const loadNewEntity = (
  entityType: EntityType,
  entityCreate: EntityCreate
): Entity => ({
  type: entityType,
  group: entityCreate.group,
  slug: entityCreate.slug,
  order: 0,
  title: '',
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
  isPublic: entityCreate.isPosted,
  isPublishing: false,
});

export const loadEntity = (documentModel: DocumentModel): EntityAdminDto => ({
  id: documentModel._id,
  type: documentModel.type,
  group: documentModel.group,
  slug: documentModel.slug,
  order: documentModel.order,
  title: documentModel.title,
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
  isPublished: documentModel.isPublic,
  isPublishing: documentModel.isPublishing,
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
