import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import {
  BestOfProvider,
  Document,
  DocumentModel,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly bestOfProvider: BestOfProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findOne$(bestOfType: BestOfType): Observable<BestOf> {
    return from(
      this.bestOfModel.findOne({
        type: this.bestOfProvider.findEntityType(bestOfType),
      })
    ).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.bestOfProvider.fromDocumentModelPublic)
    );
  }
}
