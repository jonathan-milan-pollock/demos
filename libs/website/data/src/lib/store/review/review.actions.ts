import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Review } from '@dark-rush-photography/shared/types';

export const selectReview = createAction(
  '[Review] Select Review',
  props<{ reviewId: string }>()
);

export const loadReviews = createAction('[Review] Load Reviews');

export const loadReviewsSuccess = createAction(
  '[Review] Load Reviews Success',
  props<{ reviews: Review[] }>()
);

export const loadReviewsFailure = createAction(
  '[Review] Load Reviews Failure',
  props<{ error: string }>()
);

export const loadReview = createAction(
  '[Review] Load Review',
  props<{ id: string }>()
);

export const loadReviewSuccess = createAction(
  '[Review] Load Review Success',
  props<{ review: Review }>()
);

export const loadReviewFailure = createAction(
  '[Review] Load Review Failure',
  props<{ error: string }>()
);

export const addReview = createAction(
  '[Review] Add Review',
  props<{ review: Review }>()
);

export const addReviewSuccess = createAction(
  '[Review] Add Review Success',
  props<{ review: Review }>()
);

export const addReviewFailure = createAction(
  '[Review] Add Review Failure',
  props<{ error: string }>()
);

export const updateReview = createAction(
  '[Review] Update Review',
  props<{ review: Review }>()
);

export const updateReviewSuccess = createAction(
  '[Review] Update Review Success',
  props<{ updatedReview: Update<Review> }>()
);

export const updateReviewFailure = createAction(
  '[Review] Update Review Failure',
  props<{ error: string }>()
);

export const deleteReview = createAction(
  '[Review] Delete Review',
  props<{ id: string }>()
);

export const deleteReviewSuccess = createAction(
  '[Review] Delete Review Success',
  props<{ id: string }>()
);

export const deleteReviewFailure = createAction(
  '[Review] Delete Review Failure',
  props<{ error: string }>()
);
