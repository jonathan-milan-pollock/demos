import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { ContentType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { getContentIds } from './content.functions';

export const validateContentAdd = (
  contentType: ContentType,
  documentModel: DocumentModel,
  isFound: (documentModel: DocumentModel) => boolean
): DocumentModel => {
  if (isFound(documentModel))
    throw new ConflictException(
      `${contentType} already exists`,
      HttpStatus.FOUND
    );

  return documentModel;
};

export const validateContentFound = (
  contentType: ContentType,
  id: string,
  documentModel: DocumentModel
): DocumentModel => {
  if (!getContentIds(contentType, documentModel).includes(id))
    throw new NotFoundException(`Could not find ${contentType}`);

  return documentModel;
};
