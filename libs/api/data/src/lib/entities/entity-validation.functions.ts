import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { EntityType, Location } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateEntityType = (
  entityType: EntityType,
  documentModel: DocumentModel
): DocumentModel => {
  if (documentModel.type !== entityType)
    throw new BadRequestException(
      `Found entity as ${documentModel.type}, expected ${entityType}`
    );
  return documentModel;
};

export const validateEntityNotAlreadyExists = (
  documentModel: DocumentModel | null
): void => {
  if (documentModel) throw new ConflictException('Entity already exists');
};

export const validateEntityFound = (
  documentModel: DocumentModel | null
): DocumentModel => {
  if (!documentModel) throw new NotFoundException('Entity was not found');
  return documentModel;
};

export const validateOneEntityFound = (
  documentModels: DocumentModel[]
): DocumentModel => {
  if (documentModels.length === 0) throw new NotFoundException();

  if (documentModels.length > 1)
    throw new ConflictException('More than one entity was found');

  return documentModels[0];
};

export const validateEntityNotPublishing = (
  documentModel: DocumentModel
): DocumentModel => {
  if (documentModel.isPublishing) {
    throw new ConflictException(
      'Entity cannot be modified as it currently being published'
    );
  }
  return documentModel;
};

export const validateEntityIsPublished = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!documentModel.isPublished) {
    throw new BadRequestException('Entity is not published');
  }
  return documentModel;
};

export const validateEntityIsPublic = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!documentModel.isPublic) throw new NotFoundException();
  return documentModel;
};

export const validateEntityWatchFolderId = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.googleDriveFolderId) {
    throw new BadRequestException('Entity cannot be watched');
  }
  return documentModel.googleDriveFolderId;
};

export const validateEntityGroupProvided = (group?: string): string => {
  if (!group) {
    throw new ConflictException('A group must be provided');
  }
  return group;
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
    throw new ConflictException('SEO Description was not provided');
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

export const validateEntityLocationProvided = (
  documentModel: DocumentModel
): Location => {
  if (!documentModel.location)
    throw new ConflictException('Location was not provided');
  return documentModel.location;
};
