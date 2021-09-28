import {
  Entity,
  EntityAdmin,
  EntityMinimal,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadImageAdmin,
  loadLocation,
  reloadImageDimension,
  reloadVideo,
} from '../content/content-load.functions';

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

export const loadEntityMinimal = (
  documentModel: DocumentModel
): EntityMinimal => ({
  type: documentModel.type,
  id: documentModel._id,
  watermarkedType: documentModel.watermarkedType,
  group: documentModel.group,
  slug: documentModel.slug,
});

export const loadEntityAdmin = (documentModel: DocumentModel): EntityAdmin => ({
  type: documentModel.type,
  id: documentModel._id,
  watermarkedType: documentModel.watermarkedType,
  group: documentModel.group,
  slug: documentModel.slug,
  order: documentModel.order,
  title: documentModel.title ?? '',
  seoDescription: documentModel.seoDescription ?? '',
  seoKeywords: documentModel.seoKeywords,
  dateCreated: documentModel.dateCreated ?? '',
  datePublished: documentModel.datePublished ?? '',
  location: loadLocation(documentModel.location),
  starredImageIsCentered: documentModel.starredImageIsCentered,
  text: documentModel.text,
  images: documentModel.images.map(loadImageAdmin),
  imageDimensions: documentModel.imageDimensions.map(reloadImageDimension),
  videos: documentModel.videos.map(reloadVideo),
  isPublic: documentModel.isPublic,
  isPublishing: documentModel.isPublishing,
  isPublished: documentModel.isPublished,
});

export const loadDocumentModelsArray = (
  documentModels: DocumentModel | DocumentModel[]
): DocumentModel[] => {
  return Array.isArray(documentModels) ? documentModels : [documentModels];
};
