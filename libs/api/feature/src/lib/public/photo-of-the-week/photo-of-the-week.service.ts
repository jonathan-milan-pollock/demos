import { Injectable, NotFoundException } from '@nestjs/common';
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
} from '@dark-rush-photography/api/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider
  ) {}

  findAll$(): Observable<PhotoOfTheWeek[]> {
    return from(
      this.photoOfTheWeekModel
        .find({ type: DocumentType.PhotoOfTheWeek })
        .exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.photoOfTheWeekProvider.fromDocumentModel(documentModel)
      ),
      toArray<PhotoOfTheWeek>()
    );
  }

  findOne$(id: string): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find photo of the week');

        return this.photoOfTheWeekProvider.fromDocumentModel(documentModel);
      })
    );
  }
}
