import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityDateCreated,
  validateEntityDatePublished,
  validateEntitySeoDescription,
  validateEntitySeoKeywords,
  validateEntityText,
  validateEntityTitle,
} from './entity-field-validation.functions';

export const validatePublishEntity = (
  entityType: EntityType,
  documentModel: DocumentModel
): void => {
  switch (entityType) {
    case EntityType.Event:
      validateEntityTitle(documentModel);
      validateEntitySeoDescription(documentModel);
      validateEntitySeoKeywords(documentModel);
      validateEntityDateCreated(documentModel);
      validateEntityDatePublished(documentModel);
      break;
    case EntityType.PhotoOfTheWeek:
      validateEntitySeoKeywords(documentModel);
      validateEntityDatePublished(documentModel);
      break;
    case EntityType.Review:
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      break;
  }
};
