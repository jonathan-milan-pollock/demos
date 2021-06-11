import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Review, DocumentType } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>
  ) {}

  findAll(): Observable<Review[]> {
    return from(
      this.reviewModel.find({ type: DocumentType.Review }).exec()
    ).pipe(
      switchMap((reviews) => from(reviews)),
      map(
        (review) =>
          ({
            id: review.id,
            title: review.title,
            text: review.text,
            image: review.image,
          } as Review)
      ),
      toArray<Review>()
    );
  }

  findOne(id: string): Observable<Review> {
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
