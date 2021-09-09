import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { EntityType, Location } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateEntityFound = (
  documentModel: DocumentModel | null
): DocumentModel => {
  if (!documentModel) throw new NotFoundException('Entity was not found');
  return documentModel;
};

export const validateEntityType = (
  entityType: EntityType,
  documentModel: DocumentModel
): DocumentModel => {
  if (documentModel.type !== entityType)
    throw new ConflictException(
      `Found entity with incorrect entity type (expected: ${entityType}) found: ${documentModel.type})`
    );
  return documentModel;
};

export const validateOneEntity = (
  documentModels: DocumentModel[]
): DocumentModel => {
  if (documentModels.length == 0) throw new NotFoundException();

  if (documentModels.length > 1)
    throw new ConflictException('More than one entity was found');

  return documentModels[0];
};

export const validateProcessingEntity = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!documentModel.isProcessing) {
    throw new ConflictException(
      'Entity cannot be modified unless it is being processed'
    );
  }
  return documentModel;
};

export const validateNotProcessingEntity = (
  documentModel: DocumentModel
): DocumentModel => {
  if (documentModel.isProcessing) {
    throw new ConflictException(
      'Entity cannot be modified as it currently being processed'
    );
  }
  return documentModel;
};

export const validateEntityNotFound = (
  documentModel: DocumentModel | null
): void => {
  if (documentModel) throw new ConflictException('Entity already exists');
};

export const validateEntityCreate = (
  documentModel: DocumentModel | null
): DocumentModel => {
  if (!documentModel) throw new BadRequestException('Unable to create entity');
  return documentModel;
};

export const validateEntityIsPosted = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!documentModel.isPosted) throw new NotFoundException();
  return documentModel;
};

export const validateEntityTitle = (documentModel: DocumentModel): string => {
  if (!documentModel.title) throw new ConflictException('Title was not found');
  return documentModel.title;
};

export const validateEntityDescription = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.seoDescription)
    throw new ConflictException('Description was not found');
  return documentModel.seoDescription;
};

export const validateEntityDateCreated = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.dateCreated)
    throw new ConflictException('Date created was not found');
  return documentModel.dateCreated;
};

export const validateEntityDatePublished = (
  documentModel: DocumentModel
): string => {
  if (!documentModel.datePublished)
    throw new ConflictException('Date published was not found');
  return documentModel.datePublished;
};

export const validateEntityLocation = (
  documentModel: DocumentModel
): Location => {
  if (!documentModel.location)
    throw new ConflictException('Location was not found');
  return documentModel.location;
};
