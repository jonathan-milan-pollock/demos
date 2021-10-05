import { ConflictException } from '@nestjs/common';

import { DocumentModel } from '../schema/document.schema';

export const validateEntityGoogleDriveFolderId = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.googleDriveFolderId) {
    throw new ConflictException('Google Drive folder id is undefined');
  }
  return documentModel.googleDriveFolderId;
};

export const validateEntityTitleProvided = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.title)
    throw new ConflictException('Title was not provided');
  return documentModel.title;
};

export const validateEntitySeoDescriptionProvided = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.seoDescription)
    throw new ConflictException('SEO description was not provided');
  return documentModel.seoDescription;
};

export const validateEntitySeoKeywordsProvided = (
  documentModel: DocumentModel
): string[] => {
  if (documentModel.seoKeywords.length === 0)
    throw new ConflictException('SEO keywords were not provided');
  return documentModel.seoKeywords;
};

export const validateEntityDateCreatedProvided = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.dateCreated)
    throw new ConflictException('Date created was not provided');
  return documentModel.dateCreated;
};

export const validateEntityDatePublished = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.datePublished)
    throw new ConflictException('Entity does not have required published date');
  return documentModel.datePublished;
};
