import {
  Entity,
  EntityType,
  EntityUpdate,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

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
  seoKeywords: [],
  location: {
    country: 'United States',
  },
  starredImageIsCentered: false,
  text: [],
  images: [],
  videos: [],
  isPublic: false,
  isPublished: false,
  isProcessing: false,
});

export const loadUpdateEntity = (
  entityUpdate: EntityUpdate
): Partial<DocumentModel> => ({
  slug: entityUpdate.slug,
  order: entityUpdate.order,
  title: entityUpdate.title,
  seoDescription: entityUpdate.seoDescription,
  seoKeywords: entityUpdate.seoKeywords,
  dateCreated: entityUpdate.dateCreated,
  datePublished: entityUpdate.datePublished,
  location: entityUpdate.location,
  starredImageIsCentered: entityUpdate.starredImageIsCentered,
  text: entityUpdate.text,
  isPublic: entityUpdate.isPublic,
});

export const loadDocumentModelsArray = (
  documentModels: DocumentModel | DocumentModel[]
): DocumentModel[] => {
  return Array.isArray(documentModels) ? documentModels : [documentModels];
};
