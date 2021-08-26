import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, mapTo, Observable, toArray } from 'rxjs';

import {
  Entity,
  EntityCreateDto,
  EntityType,
  EntityUpdateDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityUpdateProvider,
  EntityDeleteProvider,
  EntityPostProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityPostProvider: EntityPostProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(entityCreate: EntityCreateDto): Observable<Entity> {
    return this.entityProvider.create$(entityCreate, this.entityModel).pipe(
      concatMapTo(
        from(
          new this.entityModel({
            ...this.entityProvider.loadNewEntity(entityCreate),
          }).save()
        )
      ),
      map(this.entityProvider.validateEntityCreate),
      map(this.entityProvider.loadEntity)
    );
  }

  update$(id: string, entityUpdate: EntityUpdateDto): Observable<Entity> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityUpdate.type,
          id,
          true,
          this.entityModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(
          entityUpdate.type,
          id,
          this.entityModel
        )
      ),
      concatMapTo(this.entityModel.findByIdAndUpdate(id, { ...entityUpdate })),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityUpdate.type,
          id,
          false,
          this.entityModel
        )
      ),
      concatMapTo(this.findOne$(entityUpdate.type, id))
    );
  }

  post$(entityType: EntityType, id: string): Observable<Entity> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.entityModel
        )
      ),
      concatMapTo(
        this.entityPostProvider.post$(entityType, id, this.entityModel)
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          false,
          this.entityModel
        )
      ),
      concatMapTo(this.findOne$(entityType, id))
    );
  }

  setIsProcessing$(
    entityType: EntityType,
    id: string,
    isProcessing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map((documentModel) =>
        this.entityProvider.validateEntityType(entityType, documentModel)
      ),
      concatMapTo(
        from(this.entityModel.findByIdAndUpdate(id, { isProcessing }))
      ),
      mapTo(undefined)
    );
  }

  findAll$(entityType: EntityType): Observable<Entity[]> {
    return this.entityProvider
      .findAll$(entityType, this.entityModel)
      .pipe(map(this.entityProvider.loadEntity), toArray<Entity>());
  }

  findOne$(entityType: EntityType, id: string): Observable<Entity> {
    return this.entityProvider
      .findOne$(entityType, id, this.entityModel)
      .pipe(map(this.entityProvider.loadEntity));
  }

  findIsProcessing$(entityType: EntityType, id: string): Observable<boolean> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map((documentModel) =>
        this.entityProvider.validateEntityType(entityType, documentModel)
      ),
      map((documentModel) => documentModel.isProcessing)
    );
  }

  delete$(entityType: EntityType, id: string): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.entityModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(entityType, id, this.entityModel)
      )
    );
  }
}
