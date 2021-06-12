import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminPhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>
  ) {}

  create(photoOfTheWeek: PhotoOfTheWeek): Observable<PhotoOfTheWeek> {
    return of(new this.photoOfTheWeekModel(photoOfTheWeek)).pipe(
      switchMap((p) => p.save())
    );
  }

  update(
    id: string,
    photoOfTheWeek: PhotoOfTheWeek
  ): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      tap((p) => {
        if (!p) {
          throw new NotFoundException('Could not find photo of the week');
        }
      }),
      // switchMap(() =>
      //   this.photoOfTheWeekModel.findByIdAndUpdate(id, photoOfTheWeek)
      // ),
      map((p) => p as PhotoOfTheWeek)
    );
  }

  delete(id: string): Observable<void> {
    return of(this.photoOfTheWeekModel.findByIdAndDelete(id)).pipe(
      switchMap(() => EMPTY)
    );
  }
}
