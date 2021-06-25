import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import {
  PhotoOfTheWeek,
  DocumentType,
} from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  PhotoOfTheWeekProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findAll$(): Observable<PhotoOfTheWeek[]> {
    return from(
      this.photoOfTheWeekModel.find({ type: DocumentType.PhotoOfTheWeek })
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.photoOfTheWeekProvider.fromDocumentModelPublic),
      toArray<PhotoOfTheWeek>()
    );
  }

  findOne$(id: string): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.photoOfTheWeekProvider.fromDocumentModelPublic)
    );
  }
}
