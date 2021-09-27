import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateEntityType = (
  entityType: EntityType,
  documentModel: DocumentModel
): DocumentModel => {
  if (documentModel.type !== entityType)
    throw new BadRequestException(
      `Entity was found as type ${documentModel.type} not ${entityType}`
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
