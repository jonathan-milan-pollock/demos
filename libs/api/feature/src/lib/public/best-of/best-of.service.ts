import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from 'mongoose';

import { BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import {
  BestOfTypeProvider,
  Document,
  DocumentModel,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly bestOfTypeProvider: BestOfTypeProvider
  ) {}

  findOne(bestOfType: BestOfType): Observable<BestOf> {
    return from(
      this.bestOfModel
        .findOne({ type: this.bestOfTypeProvider.findDocumentType(bestOfType) })
        .exec()
    ).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException(`Could not find ${bestOfType}`);

        return this.documentModelProvider.toBestOf(documentModel);
      })
    );
  }
}
