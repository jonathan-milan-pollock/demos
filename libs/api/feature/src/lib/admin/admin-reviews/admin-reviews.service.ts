import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Review } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>
  ) {}

  addReview(review: Review): Observable<Review> {
    return of(new this.reviewModel(review)).pipe(switchMap((r) => r.save()));
  }

  updateReview(id: string, review: Review): Observable<Review> {
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

  deleteReview(id: string): Observable<void> {
    return of(this.reviewModel.findByIdAndDelete(id)).pipe(
      switchMap(() => EMPTY)
    );
  }
}
