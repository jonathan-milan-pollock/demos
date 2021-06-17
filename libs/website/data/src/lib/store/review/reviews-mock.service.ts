import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';

import { Review } from '@dark-rush-photography/shared-types';
import { ReviewsService } from './reviews.service';

@Injectable()
export class ReviewsServiceMock extends ReviewsService {
  constructor() {
    super({} as HttpClient);
  }

  getAll$(): Observable<Review[]> {
    return EMPTY;
  }

  get$(id: string): Observable<Review> {
    return of({ id: id } as Review);
  }

  add$(review: Review): Observable<Review> {
    return of(review);
  }

  update$(id: string, review: Review): Observable<Review> {
    const { id: updateId, ...updateReview } = review;
    return of({ id: updateId, ...updateReview });
  }

  delete$(id: string): Observable<string> {
    return of(id);
  }
}
