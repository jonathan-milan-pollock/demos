import {
  EntityAdmin,
  EntityMinimalAdmin,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadImageAdmin,
  loadLocation,
  loadVideo,
} from '../content/content-load.functions';

export const loadEntityMinimalAdmin = (
  documentModel: DocumentModel
): EntityMinimalAdmin => ({
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
  videos: documentModel.videos.map(loadVideo),
  isPublic: documentModel.isPublic,
  isPublished: documentModel.isPublished,
  isProcessing: documentModel.isProcessing,
});
