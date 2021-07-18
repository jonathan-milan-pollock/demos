import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import { BestOf, BestOfType } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import {
  BestOfProvider,
  Document,
  DocumentModel,
  EntityDeleteProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly bestOfProvider: BestOfProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(bestOfType: BestOfType): Observable<BestOf> {
    const entityType =
      this.bestOfProvider.getEntityTypeFromBestOfType(bestOfType);
    return this.entityProvider
      .create$(entityType, DEFAULT_ENTITY_GROUP, bestOfType, this.bestOfModel)
      .pipe(
        concatMapTo(
          from(
            new this.bestOfModel({
              ...this.bestOfProvider.loadNewBestOf(bestOfType),
              type: entityType,
              isPublic: true,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.bestOfProvider.loadBestOf)
      );
  }

  findOne$(bestOfType: BestOfType): Observable<BestOf> {
    const entityType =
      this.bestOfProvider.getEntityTypeFromBestOfType(bestOfType);
    return this.entityProvider
      .findAll$(entityType, this.bestOfModel)
      .pipe(
        toArray<DocumentModel>(),
        map(this.entityProvider.validateOneEntity),
        map(this.bestOfProvider.loadBestOf)
      );
  }

  delete$(bestOfType: BestOfType, id: string): Observable<void> {
    const entityType =
      this.bestOfProvider.getEntityTypeFromBestOfType(bestOfType);
    return from(this.bestOfModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.bestOfModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(entityType, id, this.bestOfModel)
      )
    );
  }
}
