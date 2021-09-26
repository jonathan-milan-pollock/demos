import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { BestOfDto } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  EntityFindAllPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly entityPublicProvider: EntityFindAllPublicProvider
  ) {}

  findAll$(): Observable<BestOfDto[]> {
    return this.entityPublicProvider
      .findAllPublic$(EntityType.BestOf, this.bestOfModel)
      .pipe(toArray<BestOfDto>());
  }
}
