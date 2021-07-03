import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BestOf, BestOfType } from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(bestOfType: BestOfType): Observable<BestOf> {
    return this.entityProvider.create$(
      this.entityProvider.getEntityTypeFromBestOfType(bestOfType),
      bestOfType,
      this.bestOfModel
    ) as Observable<BestOf>;
  }

  findOne$(bestOfType: BestOfType): Observable<BestOf> {
    return this.entityProvider
      .findAll$(
        this.entityProvider.getEntityTypeFromBestOfType(bestOfType),
        this.bestOfModel
      )
      .pipe(map(this.entityProvider.validateOne)) as Observable<BestOf>;
  }

  deleteProcess$(bestOfType: BestOfType, id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      this.entityProvider.getEntityTypeFromBestOfType(bestOfType),
      id,
      this.bestOfModel
    );
  }
}
