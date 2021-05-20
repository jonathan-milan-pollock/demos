import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import * as ReviewActions from './review.actions';
import { ReviewsService } from './reviews.service';

@Injectable()
export class ReviewEffects {
  constructor(
    private actions$: Actions,
    private reviewsService: ReviewsService
  ) {}

  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.loadReviews),
      mergeMap(() =>
        this.reviewsService.getAll().pipe(
          map((reviews) => ReviewActions.loadReviewsSuccess({ reviews })),
          catchError((error) => of(ReviewActions.loadReviewsFailure(error)))
        )
      )
    )
  );

  loadReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.loadReview),
      mergeMap((action) =>
        this.reviewsService.get(action.id).pipe(
          map((review) => ReviewActions.loadReviewSuccess({ review })),
          catchError((error) => of(ReviewActions.loadReviewFailure(error)))
        )
      )
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.addReview),
      mergeMap((action) =>
        this.reviewsService.add(action.review).pipe(
          map(
            (review) => ReviewActions.addReviewSuccess({ review }),
            catchError((error) => of(ReviewActions.addReviewFailure(error)))
          )
        )
      )
    )
  );

  updateReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.updateReview),
      mergeMap((action) =>
        this.reviewsService.update(action.review.id, action.review).pipe(
          map(
            ({ id, ...changes }) =>
              ReviewActions.updateReviewSuccess({
                updatedReview: {
                  id,
                  changes,
                },
              }),
            catchError((error) => of(ReviewActions.updateReviewFailure(error)))
          )
        )
      )
    )
  );

  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.deleteReview),
      mergeMap((action) =>
        this.reviewsService.delete(action.id).pipe(
          map(
            (id) => ReviewActions.deleteReviewSuccess({ id }),
            catchError((error) => of(ReviewActions.updateReviewFailure(error)))
          )
        )
      )
    )
  );
}
