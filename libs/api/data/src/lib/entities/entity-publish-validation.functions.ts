import { ConflictException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityCreatedDate,
  validateEntityGroup,
  validateEntityLocation,
  validateEntityOrder,
  validateEntityPublishedDate,
  validateEntitySeoDescription,
  validateEntitySeoKeywords,
  validateEntityPathname,
  validateEntityText,
  validateEntityTileDimension,
  validateEntityTitle,
} from './entity-field-validation.functions';
import {
  validatePublishLovedImages,
  validateOnePublishImage,
  validatePublishImagesAreNotStarredAndLoved,
  validatePublishImagesHavePathnames,
  validatePublishImagesHaveStorageIds,
  validatePublishStarredImage,
  validatePublishImagesHaveSeoKeywords,
  validatePublishImagesHaveSeoDescriptions,
  validatePublishImagesHaveTitles,
} from '../images/image-field-validation.functions';

export const validatePublishEntity = (
  documentModel: DocumentModel
): DocumentModel => {
  switch (documentModel.type) {
    case EntityType.About:
      validateEntityPathname(documentModel);
      validateEntityOrder(documentModel);
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      break;
    case EntityType.BestOf:
      validateEntityPathname(documentModel);
      validateEntityOrder(documentModel);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      validatePublishImagesHaveTitles(documentModel.images);
      validatePublishImagesHaveSeoDescriptions(documentModel.images);
      validatePublishImagesHaveSeoKeywords(documentModel.images);
      break;
    case EntityType.Destination:
      validateEntityPathname(documentModel);
      validateEntityOrder(documentModel);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      validatePublishStarredImage(documentModel.images);
      break;
    case EntityType.Event:
      validateEntityGroup(documentModel);
      validateEntityPathname(documentModel);
      validateEntityOrder(documentModel);
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      validateEntityCreatedDate(documentModel);
      validateEntitySeoDescription(documentModel);
      validateEntitySeoKeywords(documentModel);
      validateEntityLocation(documentModel);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      validatePublishImagesAreNotStarredAndLoved(documentModel.images);
      validatePublishStarredImage(documentModel.images);
      validatePublishLovedImages(documentModel.images);
      break;
    case EntityType.Favorites:
      validateEntityPathname(documentModel);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      validatePublishImagesHaveTitles(documentModel.images);
      validatePublishImagesHaveSeoDescriptions(documentModel.images);
      validatePublishImagesHaveSeoKeywords(documentModel.images);
      break;
    case EntityType.ImagePost:
      validateEntityPathname(documentModel);
      validateEntityText(documentModel);
      validateOnePublishImage(documentModel.images);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      break;
    case EntityType.ImageVideo:
      validateEntityPathname(documentModel);
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      validateEntitySeoDescription(documentModel);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      validatePublishImagesAreNotStarredAndLoved(documentModel.images);
      validatePublishStarredImage(documentModel.images);
      validatePublishLovedImages(documentModel.images);
      break;
    case EntityType.PhotoOfTheWeek:
      validateEntityGroup(documentModel);
      validateEntityPathname(documentModel);
      validateEntityOrder(documentModel);
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      validateEntityPublishedDate(documentModel);
      validateEntitySeoDescription(documentModel);
      validateEntitySeoKeywords(documentModel);
      validateEntityLocation(documentModel);
      validateOnePublishImage(documentModel.images);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      break;
    case EntityType.Review:
      validateEntityPathname(documentModel);
      validateEntityOrder(documentModel);
      validateEntityTitle(documentModel);
      validateEntityText(documentModel);
      validateOnePublishImage(documentModel.images);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      validateEntityTileDimension(documentModel);
      break;
    case EntityType.ReviewMedia:
      validateEntityPathname(documentModel);
      validatePublishImagesHaveStorageIds(documentModel.images);
      validatePublishImagesHavePathnames(documentModel.images);
      break;
    default:
      throw new ConflictException(
        `Could not validate entity type ${documentModel.type}`
      );
  }
  return documentModel;
};
