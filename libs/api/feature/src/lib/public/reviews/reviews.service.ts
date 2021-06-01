import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Review } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>
  ) {}

  getReviews(): Observable<Review[]> {
    return from(this.reviewModel.find({ type: 'Review' }).exec());
  }

  getReview(id: string): Observable<Review> {
    return from(this.reviewModel.findById(id)).pipe(
      tap((r) => {
        if (!r) {
          throw new NotFoundException('Could not find review');
        }
      }),
      map((r) => r as Review)
    );
  }
}
