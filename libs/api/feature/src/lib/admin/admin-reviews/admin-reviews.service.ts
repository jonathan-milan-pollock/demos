import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Review, DocumentType } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>
  ) {}

  create(review: Review): Observable<Review> {
    return from(
      new this.reviewModel({
        ...review,
        type: DocumentType.Review,
      }).save()
    ).pipe(
      map((response) => ({
        id: response.id,
        title: response.title,
        text: response.text,
        image: response.image,
      }))
    );
  }

  update(id: string, review: Review): Observable<Review> {
    return from(this.reviewModel.findById(id)).pipe(
      tap((d) => {
        if (!d) {
          throw new NotFoundException('Could not find review');
        }
      }),
      switchMap(() => this.reviewModel.findByIdAndUpdate(id, review)),
      map((d) => d as Review)
    );
  }

  delete(id: string): Observable<void> {
    return of(this.reviewModel.findByIdAndDelete(id)).pipe(
      switchMap(() => EMPTY)
    );
  }
}
