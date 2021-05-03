import { createAction, props } from '@ngrx/store';

import { Review } from '@dark-rush-photography/shared-types';

export const loadReviews = createAction('[Review] Load');

export const addReview = createAction(
  '[Review] Add',
  props<{ review: Review }>()
);

export const editReview = createAction(
  '[Review] Edit',
  props<{ review: Review }>()
);

export const deleteReview = createAction(
  '[Review] Delete',
  props<{ review: Review }>()
);
