import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';

import { BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import {
  BestOfProvider,
  Document,
  DocumentModel,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly bestOfProvider: BestOfProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  create$(bestOfType: BestOfType): Observable<BestOf> {
    return from(
      this.bestOfModel.findOne({
        type: this.bestOfProvider.findEntityType(bestOfType),
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.bestOfModel(this.bestOfProvider.newBestOf(bestOfType)).save()
        );
      }),
      map(this.documentModelProvider.validateCreate),
      map(this.bestOfProvider.fromDocumentModel)
    );
  }

  findOne$(bestOfType: BestOfType): Observable<BestOf> {
    return from(
      this.bestOfModel.findOne({
        type: this.bestOfProvider.findEntityType(bestOfType),
      })
    ).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.bestOfProvider.fromDocumentModel)
    );
  }

  delete$(bestOfType: BestOfType): Observable<void> {
    return from(
      this.bestOfModel.findOneAndDelete({
        type: this.bestOfProvider.findEntityType(bestOfType),
      })
    ).pipe(mapTo(undefined));
  }
}
