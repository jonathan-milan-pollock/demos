import { Injectable } from '@nestjs/common';

import {
  AboutDto,
  BestOfDto,
  BestOfType,
  DestinationDto,
  DestinationMinimalDto,
  EntityCreateDto,
  EntityType,
  EventDto,
  EventMinimalDto,
  FavoritesDto,
  PhotoOfTheWeekDto,
  PhotoOfTheWeekMinimalDto,
  ReviewDto,
  ReviewMediaDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { Entity } from '@dark-rush-photography/shared/types';
import { loadPublicContent } from '../content/public-content.functions';
import { loadAboutPublic } from '../entities/about.functions';
import { loadBestOfPublic } from '../entities/best-of.functions';
import {
  loadDestinationPublic,
  loadMinimalDestinationPublic,
} from '../entities/destination.functions';
import {
  loadEventPublic,
  loadMinimalEventPublic,
} from '../entities/event.functions';
import { loadFavoritesPublic } from '../entities/favorites.functions';
import {
  loadMinimalPhotoOfTheWeekPublic,
  loadPhotoOfTheWeekPublic,
} from '../entities/photo-of-the-week.functions';
import { loadReviewMediaPublic } from '../entities/review-media.functions';
import { loadReviewPublic } from '../entities/review.functions';
import { loadEntity, loadNewEntity } from '../entities/entity.functions';

@Injectable()
export class EntityLoadProvider {
  loadNewEntity = (entityCreate: EntityCreateDto): Entity =>
    loadNewEntity(entityCreate);

  loadEntity = (documentModel: DocumentModel): Entity =>
    loadEntity(documentModel);

  loadAboutPublic(documentModel: DocumentModel): AboutDto {
    return loadAboutPublic(documentModel, loadPublicContent(documentModel));
  }

  loadBestOfPublic(documentModel: DocumentModel): BestOfDto {
    return loadBestOfPublic(loadPublicContent(documentModel));
  }

  loadMinimalDestinationPublic(
    documentModel: DocumentModel
  ): DestinationMinimalDto {
    return loadMinimalDestinationPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadDestinationPublic(documentModel: DocumentModel): DestinationDto {
    return loadDestinationPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadMinimalEventPublic(documentModel: DocumentModel): EventMinimalDto {
    return loadMinimalEventPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadEventPublic(documentModel: DocumentModel): EventDto {
    return loadEventPublic(documentModel, loadPublicContent(documentModel));
  }

  loadFavoritesPublic(documentModel: DocumentModel): FavoritesDto {
    return loadFavoritesPublic(loadPublicContent(documentModel));
  }

  loadMinimalPhotoOfTheWeekPublic(
    documentModel: DocumentModel
  ): PhotoOfTheWeekMinimalDto {
    return loadMinimalPhotoOfTheWeekPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadPhotoOfTheWeekPublic(documentModel: DocumentModel): PhotoOfTheWeekDto {
    return loadPhotoOfTheWeekPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadReviewMediaPublic(documentModel: DocumentModel): ReviewMediaDto {
    return loadReviewMediaPublic(loadPublicContent(documentModel));
  }

  loadReviewPublic(documentModel: DocumentModel): ReviewDto {
    return loadReviewPublic(documentModel, loadPublicContent(documentModel));
  }
}
