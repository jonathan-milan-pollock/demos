/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from '@nestjs/common';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityType,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity-load.functions';
import { validateOneEntityFound } from '../entities/entity-validation.functions';
import {
  validateEntityDatePublished,
  validateEntityTitleProvided,
} from '../entities/entity-field-validation.functions';
import { loadImageMinimal } from '../content/content-load.functions';
import { loadPublicContent } from '../content/content-load-public.functions';
import {
  validateFindImageDimension,
  validateFindStarredImage,
  validateOneImage,
} from '../content/content-validation.functions';

@Injectable()
export class EntityFindAllPublicProvider {
  findAllPublic$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<any> {
    return from(entityModel.find({ type: entityType, isPublic: true })).pipe(
      map(loadDocumentModelsArray),
      map((documentModels) => {
        if (
          entityType === EntityType.Favorites ||
          entityType === EntityType.ReviewMedia
        ) {
          validateOneEntityFound(documentModels);
        }
        return documentModels;
      }),
      concatMap((documentModels) => from(documentModels)),
      map((documentModel) => ({
        documentModel,
        publicContent: loadPublicContent(documentModel),
      })),
      map(({ documentModel, publicContent }) => {
        switch (entityType) {
          case EntityType.About:
            return {
              slug: documentModel.slug,
              order: documentModel.order,
              images: publicContent.images.map(loadImageMinimal),
            };
          case EntityType.BestOf:
            return {
              slug: documentModel.slug,
              images: publicContent.images.map(loadImageMinimal),
            };
          case EntityType.Destination:
            return {
              slug: documentModel.slug,
              order: documentModel.order,
              starredImage: validateFindStarredImage(publicContent.images),
            };
          case EntityType.Event:
            return {
              group: documentModel.group,
              slug: documentModel.slug,
              order: documentModel.order,
              title: validateEntityTitleProvided(documentModel),
              starredImageIsCentered: documentModel.starredImageIsCentered,
              starredImage: validateFindStarredImage(publicContent.images),
              starredSmallImageDimensions: validateFindImageDimension(
                validateFindStarredImage(publicContent.images).id,
                ImageDimensionType.Small,
                publicContent.imageDimensions
              ),
            };
          case EntityType.PhotoOfTheWeek:
            return {
              group: documentModel.group,
              slug: documentModel.slug,
              order: documentModel.order,
              title: validateEntityTitleProvided(documentModel),
              datePublished: validateEntityDatePublished(documentModel),
              starredImageIsCentered: documentModel.starredImageIsCentered,
              starredImage: validateFindStarredImage(publicContent.images),
              starredSmallImageDimensions: validateFindImageDimension(
                validateFindStarredImage(publicContent.images).id,
                ImageDimensionType.Small,
                publicContent.imageDimensions
              ),
            };
          case EntityType.Favorites:
            return {
              images: publicContent.images.map(loadImageMinimal),
            };
          case EntityType.ReviewMedia:
            return {
              images: publicContent.images.map(loadImageMinimal),
            };
          case EntityType.Review:
            return {
              slug: documentModel.slug,
              order: documentModel.order,
              title: validateEntityTitleProvided(documentModel),
              text: documentModel.text,
              image: loadImageMinimal(validateOneImage(publicContent.images)),
            };
          default:
            throw new NotFoundException(
              `Could not find all entities for type ${entityType}`
            );
        }
      })
    );
  }
}
