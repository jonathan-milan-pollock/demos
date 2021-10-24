import { EntityType } from '@dark-rush-photography/shared/types';
import { Logger } from '@nestjs/common';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityCreatedDate,
  validateEntityPublishedDate,
  validateEntityGroup,
  validateEntityImageVideo,
  validateEntityLocation,
  validateEntityOrder,
  validateEntitySeoDescription,
  validateEntitySeoKeywords,
  validateEntitySlug,
  validateEntityStarredImage,
  validateEntityText,
  validateEntityTitle,
} from './entity-field-validation.functions';

export const validatePublishEntity = (
  documentModel: DocumentModel
): DocumentModel => {
  const logger = new Logger(validatePublishEntity.name);

  switch (documentModel.type) {
    case EntityType.About:
      validateEntitySlug(documentModel);
      validateEntityOrder(documentModel);
      break;
    case EntityType.BestOf:
      validateEntitySlug(documentModel);
      break;
    case EntityType.Destination:
      validateEntitySlug(documentModel);
      validateEntityStarredImage(documentModel);
      break;
    case EntityType.Event:
      validateEntityGroup(documentModel);
      validateEntitySlug(documentModel);
      validateEntityOrder(documentModel);
      validateEntityTitle(documentModel);
      validateEntitySeoDescription(documentModel);
      validateEntitySeoKeywords(documentModel);
      validateEntityCreatedDate(documentModel);
      validateEntityPublishedDate(documentModel);
      validateEntityLocation(documentModel);
      validateEntityText(documentModel);
      validateEntityStarredImage(documentModel);
      validateEntityImageVideo(documentModel);
      break;
    case EntityType.Favorites:
      validateEntitySlug(documentModel);
      break;
    case EntityType.ImagePost:
      validateEntityText(documentModel);
      validateEntityStarredImage(documentModel);
      break;
    case EntityType.ImageVideo:
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      validateEntityImageVideo(documentModel);
      validateEntityStarredImage(documentModel);
      break;
    case EntityType.PhotoOfTheWeek:
      validateEntitySeoKeywords(documentModel);
      validateEntityPublishedDate(documentModel);
      validateEntityStarredImage(documentModel);
      break;
    case EntityType.Review:
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      break;
    case EntityType.ReviewMedia:
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      break;
  }
  logger.log('Entity is valid for publishing');
  return documentModel;
};
