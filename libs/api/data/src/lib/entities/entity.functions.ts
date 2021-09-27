import {
  Entity,
  EntityMinimal,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadComment } from '../content/comment.functions';
import { loadEmotion } from '../content/emotion.functions';
import { loadImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadVideo } from '../content/video.functions';

export const loadNewEntity = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug: string,
  googleDriveFolderId?: string
): Entity => ({
  type: entityType,
  googleDriveFolderId,
  watermarkedType,
  group,
  slug,
  order: 0,
  title: '',
  seoDescription: '',
  seoKeywords: [],
  dateCreated: '',
  datePublished: '',
  location: {
    country: 'United States',
  },
  starredImageIsCentered: false,
  text: [],
  images: [],
  imageDimensions: [],
  videos: [],
  comments: [],
  emotions: [],
  isPublic: false,
  isPublishing: false,
  isPublished: false,
});

export const loadEntity = (documentModel: DocumentModel): Entity => ({
  type: documentModel.type,
  id: documentModel._id,
  googleDriveFolderId: documentModel.googleDriveFolderId,
  watermarkedType: documentModel.watermarkedType,
  group: documentModel.group,
  slug: documentModel.slug,
  order: documentModel.order,
  title: documentModel.title,
  seoDescription: documentModel.seoDescription,
  seoKeywords: documentModel.seoKeywords,
  dateCreated: documentModel.dateCreated,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  starredImageIsCentered: documentModel.starredImageIsCentered,
  text: documentModel.text,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
  comments: documentModel.comments.map(loadComment),
  emotions: documentModel.emotions.map(loadEmotion),
  isPublic: documentModel.isPublic,
  isPublishing: documentModel.isPublishing,
  isPublished: documentModel.isPublished,
});

export const loadEntityMinimal = (
  documentModel: DocumentModel
): EntityMinimal => ({
  type: documentModel.type,
  id: documentModel._id,
  watermarkedType: documentModel.watermarkedType,
  group: documentModel.group,
  slug: documentModel.slug,
});

export const loadDocumentModelsArray = (
  documentModels: DocumentModel | DocumentModel[]
): DocumentModel[] => {
  return Array.isArray(documentModels) ? documentModels : [documentModels];
};
