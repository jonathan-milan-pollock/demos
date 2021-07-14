import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import {
  concatMap,
  concatMapTo,
  filter,
  map,
  mapTo,
  toArray,
} from 'rxjs/operators';

import {
  BestOfType,
  Entity,
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
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
  validateOneEntity,
  validateProcessingEntity,
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

  validateEntityFound(documentModel: DocumentModel | null): DocumentModel {
    return validateEntityFound(documentModel);
  }

  validateEntityType(
    entityType: EntityType,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateEntityType(entityType, documentModel);
  }

  validateOneEntity(documentModels: Partial<Entity>[]): Partial<Entity> {
    return validateOneEntity(documentModels);
  }

  validateProcessingEntity(documentModel: DocumentModel): DocumentModel {
    return validateProcessingEntity(documentModel);
  }

  create$(
    entityType: EntityType,
    group: string,
    slug: string,
    entityModel: Model<DocumentModel>
  ): Observable<Partial<Entity>> {
    return from(entityModel.findOne({ type: entityType, group, slug })).pipe(
      map(validateEntityNotFound),
      concatMapTo(from(new entityModel(newEntity(entityType, slug)).save())),
      map(validateEntityCreate),
      map((documentModel) => fromDocumentModel(entityType, documentModel))
    );
  }

  findOrCreate$(
    entityType: EntityType,
    group: string,
    slug: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(
      from(entityModel.findOne({ type: entityType, group, slug }))
    ).pipe(
      concatMap((documentModel) =>
        documentModel
          ? of(documentModel)
          : from(new entityModel(newEntity(entityType, slug)).save())
      ),
      map(validateEntityFound)
    );
  }

  findAll$(
    entityType: EntityType,
    entityModel: Model<DocumentModel>
  ): Observable<Partial<Entity>[]> {
    return from(entityModel.find({ type: entityType })).pipe(
      concatMap(
        (documentModels) => from([...(documentModels as DocumentModel[])]) //TODO: This is either DocumentModel or DocumentModel[] so fix
      ),
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
      concatMap(
        (documentModels) => from([...(documentModels as DocumentModel[])]) //TODO: This is either DocumentModel or DocumentModel[] so fix
      ),
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

  delete$(
    entityType: EntityType,
    id: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(id)).pipe(
      map((documentModel) =>
        documentModel
          ? validateEntityType(entityType, documentModel)
          : of(documentModel)
      ),
      concatMap((documentModel) =>
        documentModel ? from(entityModel.findByIdAndDelete(id)) : of()
      ),
      mapTo(undefined)
    );
  }
}
