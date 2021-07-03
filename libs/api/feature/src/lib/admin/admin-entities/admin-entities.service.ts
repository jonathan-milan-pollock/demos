import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo } from 'rxjs/operators';

import {
  Entity,
  EntityCreate,
  EntityType,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(
    entityType: EntityType,
    entityCreate: EntityCreate
  ): Observable<Entity> {
    if (entityCreate.group) {
      return this.entityProvider.create$(
        entityType,
        entityCreate.slug,
        this.entityModel,
        entityCreate.group
      ) as Observable<Entity>;
    }
    return this.entityProvider.create$(
      entityType,
      entityCreate.slug,
      this.entityModel
    ) as Observable<Entity>;
  }

  update$(
    entityType: EntityType,
    id: string,
    entityUpdate: EntityUpdate
  ): Observable<Entity> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateFound),
      switchMapTo(this.entityModel.findByIdAndUpdate(id, { ...entityUpdate })),
      switchMapTo(this.findOne$(entityType, id))
    );
  }

  setIsProcessing$(
    entityType: EntityType,
    id: string,
    isProcessing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateFound),
      map((documentModel) =>
        this.entityProvider.validateEntityType(entityType, documentModel)
      ),
      switchMapTo(
        from(this.entityModel.findByIdAndUpdate(id, { isProcessing }))
      ),
      mapTo(undefined)
    );
  }

  findAll$(entityType: EntityType): Observable<Entity[]> {
    return this.entityProvider.findAll$(
      entityType,
      this.entityModel
    ) as Observable<Entity[]>;
  }

  findOne$(entityType: EntityType, id: string): Observable<Entity> {
    return this.entityProvider.findOne$(
      entityType,
      id,
      this.entityModel
    ) as Observable<Entity>;
  }

  findIsProcessing$(entityType: EntityType, id: string): Observable<boolean> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateFound),
      map((documentModel) =>
        this.entityProvider.validateEntityType(entityType, documentModel)
      ),
      map((documentModel) => documentModel.isProcessing)
    );
  }

  delete$(_entityType: EntityType, id: string): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      switchMap((documentModel) =>
        documentModel ? from(this.entityModel.findByIdAndDelete(id)) : of()
      ),
      mapTo(undefined)
    );
  }
}
