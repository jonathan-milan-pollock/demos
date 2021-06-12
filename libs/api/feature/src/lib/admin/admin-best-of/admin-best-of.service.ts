import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { BestOf } from '@dark-rush-photography/shared-types';
import {
  BestOfTypeProvider,
  Document,
  DocumentModel,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly bestOfTypeProvider: BestOfTypeProvider
  ) {}

  createIfNotExists$(bestOf: BestOf): Observable<BestOf> {
    return from(
      this.bestOfModel.findOne({
        type: this.bestOfTypeProvider.findDocumentType(bestOf.slug),
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.bestOfModel({
            ...bestOf,
            type: this.bestOfTypeProvider.findDocumentType(bestOf.slug),
            isPublic: true,
          }).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new ConflictException(`Unable to create ${bestOf.slug}`);
        }
        return this.documentModelProvider.toBestOf(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.bestOfModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
