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

export const validateEntityTitle = (documentModel: DocumentModel): string => {
  if (!documentModel.title) throw new ConflictException('Title is undefined');
  return documentModel.title;
};

export const validateEntitySeoDescription = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.seoDescription)
    throw new ConflictException('SEO description is undefined');
  return documentModel.seoDescription;
};

export const validateEntitySeoKeywords = (
  documentModel: DocumentModel
): string[] => {
  if (documentModel.seoKeywords.length === 0)
    throw new ConflictException('SEO keywords are empty');
  return documentModel.seoKeywords;
};

export const validateEntityDateCreated = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.dateCreated)
    throw new ConflictException('Date created is undefined');
  return documentModel.dateCreated;
};

export const validateEntityDatePublished = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.datePublished)
    throw new ConflictException('Date published is undefined');
  return documentModel.datePublished;
};

export const validateEntityText = (documentModel: DocumentModel): string[] => {
  if (documentModel.text.length === 0)
    throw new ConflictException('Text is empty');
  return documentModel.text;
};
