import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  PhotoOfTheWeek,
  DocumentType,
} from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>
  ) {}

  findAll(): Observable<PhotoOfTheWeek[]> {
    return from(
      this.photoOfTheWeekModel
        .find({ type: DocumentType.PhotoOfTheWeek })
        .exec()
    );
  }

  findOne(id: string): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      tap((p) => {
        if (!p) {
          throw new NotFoundException('Could not find photo of the week');
        }
      }),
      map((p) => p as PhotoOfTheWeek)
    );
  }
}
