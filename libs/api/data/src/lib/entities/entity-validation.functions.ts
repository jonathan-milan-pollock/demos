import { EntityType } from '@dark-rush-photography/shared/types';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { DocumentModel } from '../schema/document.schema';

export const validateEntityType = (
  entityType: EntityType,
  documentModel: DocumentModel
): DocumentModel => {
  if (documentModel.type !== entityType)
    throw new BadRequestException(
      `Found entity as ${documentModel.type} was called with ${entityType}`
    );
  return documentModel;
};

export const validateEntityFound = (
  documentModel: DocumentModel | null
): DocumentModel => {
  if (!documentModel) throw new NotFoundException();
  return documentModel;
};

export const validateEntityIsPublic = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!documentModel.isPublic) throw new NotFoundException();
  return documentModel;
};

export const validateEntityIsPublished = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!documentModel.isPublished)
    throw new ConflictException('Entity is not published');
  return documentModel;
};
