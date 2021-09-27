/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from '@nestjs/common';

import { from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityType,
  validateEntityFound,
  validateEntityIsPublic,
} from '../entities/entity-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import {
  validateEntityDateCreatedProvided,
  validateEntityDatePublished,
  validateEntityLocationProvided,
  validateEntitySeoDescriptionProvided,
  validateEntitySeoKeywordsProvided,
  validateEntityTitleProvided,
} from '../entities/entity-field-validation.functions';
import { loadPublicContent } from '../content/public-content.functions';

@Injectable()
export class EntityFindOnePublicProvider {
  findOnePublic$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<any> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map((documentModel) => ({
        documentModel,
        publicContent: loadPublicContent(documentModel),
      })),
      map(({ documentModel, publicContent }) => {
        switch (entityType) {
          case EntityType.Destination:
            return {
              slug: documentModel.slug,
              order: documentModel.order,
              images: publicContent.images.map(loadMinimalPublicImage),
            };
          case EntityType.Event:
            return {
              group: documentModel.group,
              slug: documentModel.slug,
              order: documentModel.order,
              title: validateEntityTitleProvided(documentModel),
              description: validateEntitySeoDescriptionProvided(documentModel),
              keywords: validateEntitySeoKeywordsProvided(documentModel),
              dateCreated: validateEntityDateCreatedProvided(documentModel),
              location: validateEntityLocationProvided(documentModel),
              text: documentModel.text,
              images: publicContent.images.map(loadMinimalPublicImage),
            };
          case EntityType.PhotoOfTheWeek:
            return {
              group: documentModel.group,
              slug: documentModel.slug,
              order: documentModel.order,
              title: validateEntityTitleProvided(documentModel),
              description: validateEntitySeoDescriptionProvided(documentModel),
              keywords: validateEntitySeoKeywordsProvided(documentModel),
              datePublished: validateEntityDatePublished(documentModel),
              location: validateEntityLocationProvided(documentModel),
              text: documentModel.text,
              images: publicContent.images.map(loadMinimalPublicImage),
            };
          default:
            throw new NotFoundException(
              `Could not find one entity for type ${entityType}`
            );
        }
      })
    );
  }
}
