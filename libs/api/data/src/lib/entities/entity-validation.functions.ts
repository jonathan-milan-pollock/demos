import { NotFoundException } from '@nestjs/common';

import { DocumentModel } from '../schema/document.schema';

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
