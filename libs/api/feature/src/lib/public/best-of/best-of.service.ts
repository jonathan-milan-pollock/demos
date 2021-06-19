import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import {
  BestOfProvider,
  Document,
  DocumentModel,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly bestOfProvider: BestOfProvider
  ) {}

  findOne$(bestOfType: BestOfType): Observable<BestOf> {
    return from(
      this.bestOfModel
        .findOne({ type: this.bestOfProvider.findDocumentType(bestOfType) })
        .exec()
    ).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException(`Could not find best of ${bestOfType}`);

        return this.bestOfProvider.fromDocumentModel(documentModel);
      })
    );
  }
}
