import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { Entity, EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateEntityCreate = (
  documentModel: DocumentModel | null
): DocumentModel => {
  if (!documentModel) throw new BadRequestException('Unable to create');
  return documentModel;
};

export const validateEntityFound = (
  documentModel: DocumentModel | null
): DocumentModel => {
  if (!documentModel) throw new NotFoundException();
  return documentModel;
};

export const validateEntityNotFound = (
  documentModel: DocumentModel | null
): void => {
  if (documentModel)
    throw new ConflictException('Entity has already been created');
};

export const validateEntityRemove = (
  documentModel: DocumentModel | null
): void => {
  if (!documentModel) {
    throw new BadRequestException('Unable to remove');
  }
};

export const validateEntityIsPublic = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!documentModel.isPublic) throw new NotFoundException();
  return documentModel;
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
    throw new ConflictException('Entity is currently being processed');
  }
  return documentModel;
};

export const validateOneEntity = (
  documentModels: Partial<Entity>[]
): Partial<Entity> => {
  if (documentModels.length == 0) throw new NotFoundException();

  if (documentModels.length > 1)
    throw new ConflictException('More than one entity found');

  return documentModels[0];
};

export const validateEntityType = (
  entityType: EntityType,
  documentModel: DocumentModel
): DocumentModel => {
  if (documentModel.type !== entityType)
    throw new BadRequestException(
      `Found entity with incorrect entity type (expected: ${entityType}) found: ${documentModel.type})`
    );
  return documentModel;
};
