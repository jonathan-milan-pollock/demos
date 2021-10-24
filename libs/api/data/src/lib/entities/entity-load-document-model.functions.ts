import { v4 as uuidv4 } from 'uuid';

import {
  DEFAULT_ENTITY_GROUP,
  Entity,
  EntityType,
  EntityUpdate,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const loadCreateTestEntity = (): Entity => ({
  type: EntityType.Test,
  watermarkedType: WatermarkedType.WithoutWatermark,
  group: DEFAULT_ENTITY_GROUP,
  slug: uuidv4(),
  order: 0,
  isPublic: false,
  seoKeywords: [],
  starredImageIsCentered: false,
  images: [],
  isDeleted: false,
});

export const loadCreateEntityForFolder = (
  entityType: EntityType,
  googleDriveFolderId: string,
  watermarkedType: WatermarkedType,
  group: string,
  slug: string,
  order: number
): Entity => ({
  type: entityType,
  googleDriveFolderId,
  watermarkedType,
  group,
  slug,
  order,
  isPublic: false,
  seoKeywords: [],
  starredImageIsCentered: false,
  images: [],
  isDeleted: false,
});

export const loadCreateImagePostEntity = (text: string): Entity => ({
  type: EntityType.ImagePost,
  watermarkedType: WatermarkedType.WithoutWatermark,
  group: DEFAULT_ENTITY_GROUP,
  slug: uuidv4(),
  order: 0,
  isPublic: false,
  text,
  seoKeywords: [],
  starredImageIsCentered: false,
  images: [],
  isDeleted: false,
});

export const loadUpdateEntity = (
  entityUpdate: EntityUpdate
): Partial<DocumentModel> => ({
  title: entityUpdate.title,
  seoDescription: entityUpdate.seoDescription,
  seoKeywords: entityUpdate.seoKeywords,
  createdDate: entityUpdate.createdDate,
  publishedDate: entityUpdate.publishedDate,
  location: entityUpdate.location,
  starredImageIsCentered: entityUpdate.starredImageIsCentered,
  text: entityUpdate.text,
  isPublic: entityUpdate.isPublic,
  tileDimension: entityUpdate.tileDimension,
});

export const loadDocumentModelsArray = (
  documentModels: DocumentModel | DocumentModel[]
): DocumentModel[] => {
  return Array.isArray(documentModels) ? documentModels : [documentModels];
};
