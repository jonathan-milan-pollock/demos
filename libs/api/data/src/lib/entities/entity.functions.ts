import { Entity, EntityType } from '@dark-rush-photography/shared/types';
import {
  getBestOfTypeFromEntityType,
  getMediaProcessTypeFromEntityType,
} from '@dark-rush-photography/shared/util';
import { BadRequestException } from '@nestjs/common';
import { DocumentModel } from '../schema/document.schema';
import {
  aboutFromDocumentModel,
  aboutFromDocumentModelPublic,
  newAbout,
} from '../entities/about.functions';
import {
  bestOfFromDocumentModel,
  bestOfFromDocumentModelPublic,
  newBestOf,
} from '../entities/best-of.functions';
import {
  destinationFromDocumentModel,
  destinationFromDocumentModelPublic,
  newDestination,
} from '../entities/destination.functions';
import {
  eventFromDocumentModel,
  eventFromDocumentModelPublic,
  newEvent,
} from '../entities/event.functions';
import {
  favoritesFromDocumentModel,
  favoritesFromDocumentModelPublic,
  newFavorites,
} from '../entities/favorites.functions';
import {
  mediaProcessFromDocumentModel,
  newMediaProcess,
} from '../entities/media-process.functions';
import {
  newPhotoOfTheWeek,
  photoOfTheWeekFromDocumentModel,
  photoOfTheWeekFromDocumentModelPublic,
} from '../entities/photo-of-the-week.functions';
import {
  newReviewMedia,
  reviewMediaFromDocumentModel,
  reviewMediaFromDocumentModelPublic,
} from '../entities/review-media.functions';
import {
  newReview,
  reviewFromDocumentModel,
  reviewFromDocumentModelPublic,
} from '../entities/review.functions';
import {
  newSocialMedia,
  socialMediaFromDocumentModel,
} from '../entities/social-media.functions';
import { findPublicContent } from '../content/content.functions';

export const newEntity = (
  entityType: EntityType,
  slug: string,
  group?: string
): Partial<Entity> => {
  switch (entityType) {
    case EntityType.About:
      return newAbout(slug) as Partial<Entity>;
    case EntityType.BestOfChildren:
    case EntityType.BestOfEvents:
    case EntityType.BestOfLandscapes:
    case EntityType.BestOfNature:
    case EntityType.BestOfRealEstate:
      return newBestOf(getBestOfTypeFromEntityType(entityType));
    case EntityType.Destination:
      return newDestination(slug);
    case EntityType.Event:
      if (!group) {
        throw new BadRequestException('A group is required to create an event');
      }
      return newEvent(group, slug);
    case EntityType.Favorites:
      return newFavorites();
    case EntityType.MediaProcessAppleResource:
    case EntityType.MediaProcessIcon:
    case EntityType.MediaProcessImageVideo:
    case EntityType.MediaProcessPng:
    case EntityType.MediaProcessSocialMediaImage:
    case EntityType.MediaProcessSocialMediaVideo:
      return newMediaProcess(
        getMediaProcessTypeFromEntityType(entityType),
        slug
      );
    case EntityType.PhotoOfTheWeek:
      if (!group) {
        throw new BadRequestException(
          'A group is required to create a photo of the week'
        );
      }
      return newPhotoOfTheWeek(group, slug);
    case EntityType.ReviewMedia:
      return newReviewMedia();
    case EntityType.Review:
      return newReview(slug);
    case EntityType.SocialMedia:
      if (!group) {
        throw new BadRequestException(
          'A group is required to create a photo of the week'
        );
      }
      return newSocialMedia(group, slug);
    default:
      throw new BadRequestException(
        `Can not create a new entity for document type ${entityType}`
      );
  }
};

export const fromDocumentModel = (
  entityType: EntityType,
  documentModel: DocumentModel
): Partial<Entity> => {
  switch (entityType) {
    case EntityType.About:
      return aboutFromDocumentModel(documentModel);
    case EntityType.BestOfChildren:
    case EntityType.BestOfEvents:
    case EntityType.BestOfLandscapes:
    case EntityType.BestOfNature:
    case EntityType.BestOfRealEstate:
      return bestOfFromDocumentModel(documentModel);
    case EntityType.Destination:
      return destinationFromDocumentModel(documentModel);
    case EntityType.Event:
      return eventFromDocumentModel(documentModel);
    case EntityType.Favorites:
      return favoritesFromDocumentModel(documentModel);
    case EntityType.MediaProcessAppleResource:
    case EntityType.MediaProcessIcon:
    case EntityType.MediaProcessImageVideo:
    case EntityType.MediaProcessPng:
    case EntityType.MediaProcessSocialMediaImage:
    case EntityType.MediaProcessSocialMediaVideo:
      return mediaProcessFromDocumentModel(documentModel);
    case EntityType.PhotoOfTheWeek:
      return photoOfTheWeekFromDocumentModel(documentModel);
    case EntityType.ReviewMedia:
      return reviewMediaFromDocumentModel(documentModel);
    case EntityType.Review:
      return reviewFromDocumentModel(documentModel);
    case EntityType.SocialMedia:
      return socialMediaFromDocumentModel(documentModel);
    default:
      throw new BadRequestException(
        `Can not the load document model for document type ${entityType}`
      );
  }
};

export const fromDocumentModelPublic = (
  entityType: EntityType,
  documentModel: DocumentModel
): Partial<Entity> => {
  const publicContent = findPublicContent(documentModel);
  switch (entityType) {
    case EntityType.About:
      return aboutFromDocumentModelPublic(documentModel, publicContent);
    case EntityType.BestOfChildren:
    case EntityType.BestOfEvents:
    case EntityType.BestOfLandscapes:
    case EntityType.BestOfNature:
    case EntityType.BestOfRealEstate:
      return bestOfFromDocumentModelPublic(documentModel, publicContent);
    case EntityType.Destination:
      return destinationFromDocumentModelPublic(documentModel, publicContent);
    case EntityType.Event:
      return eventFromDocumentModelPublic(documentModel, publicContent);
    case EntityType.Favorites:
      return favoritesFromDocumentModelPublic(documentModel, publicContent);
    case EntityType.PhotoOfTheWeek:
      return photoOfTheWeekFromDocumentModelPublic(
        documentModel,
        publicContent
      );
    case EntityType.ReviewMedia:
      return reviewMediaFromDocumentModelPublic(documentModel, publicContent);
    case EntityType.Review:
      return reviewFromDocumentModelPublic(documentModel, publicContent);
    default:
      throw new BadRequestException(
        `Can not the load the public document model for document type ${entityType}`
      );
  }
};
