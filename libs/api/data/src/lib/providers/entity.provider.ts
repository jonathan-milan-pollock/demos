import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import {
  BestOfType,
  Entity,
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_GROUP } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  fromDocumentModel,
  fromDocumentModelPublic,
  newEntity,
} from '../entities/entity.functions';
import {
  validateEntityCreate,
  validateEntityType,
  validateEntityFound,
  validateEntityIsPublic,
  validateEntityNotFound,
} from '../entities/entity-validation.functions';

@Injectable()
export class EntityProvider {
  getEntityTypeFromBestOfType(bestOfType: BestOfType): EntityType {
    return this.getEntityTypeFromBestOfType(bestOfType);
  }

  getEntityTypeFromMediaProcessType(
    mediaProcessType: MediaProcessType
  ): EntityType {
    return this.getEntityTypeFromMediaProcessType(mediaProcessType);
  }

  validateFound(documentModel: DocumentModel | null): DocumentModel {
    return validateEntityFound(documentModel);
  }

  validateEntityType(
    entityType: EntityType,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateEntityType(entityType, documentModel);
  }

  validateOne(documentModels: Partial<Entity>[]): Partial<Entity> {
    return this.validateOne(documentModels);
  }

  create$(
    entityType: EntityType,
    slug: string,
    entityModel: Model<DocumentModel>,
    group = DEFAULT_GROUP
  ): Observable<Partial<Entity>> {
    return from(entityModel.findOne({ type: entityType, group, slug })).pipe(
      map(validateEntityNotFound),
      switchMapTo(from(new entityModel(newEntity(entityType, slug)).save())),
      map(validateEntityCreate),
      map((documentModel) => fromDocumentModel(entityType, documentModel))
    );
  }

  findAll$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<Partial<Entity>[]> {
    return from(entityModel.find({ type: entityType })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) => fromDocumentModel(entityType, documentModel)),
      toArray<Partial<Entity>>()
    );
  }

  findOne$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<Partial<Entity>> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map((documentModel) => fromDocumentModel(entityType, documentModel))
    );
  }

  findAllPublic$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<Partial<Entity>[]> {
    return from(entityModel.find({ type: entityType })).pipe(
      switchMap((documentModels) => from(documentModels)),
      filter((documentModel) => !documentModel.isPublic),
      map((documentModel) => fromDocumentModel(entityType, documentModel)),
      toArray<Partial<Entity>>()
    );
  }

  findOnePublic$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<Partial<Entity>> {
    return from(entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map((documentModel) => fromDocumentModelPublic(entityType, documentModel))
    );
  }
}
