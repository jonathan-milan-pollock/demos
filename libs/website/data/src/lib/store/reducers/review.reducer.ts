import { Action, createReducer, on } from '@ngrx/store';

import { Review } from '@dark-rush-photography/shared-types';
import * as ReviewActions from '../actions/review.actions';

export const reviewFeatureKey = 'review';

export interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

const reducer = createReducer(
  initialState,
  on(ReviewActions.addReview, (state, { review }) => ({
    ...state,
    reviews: [...state.reviews, { ...review }],
  })),
  on(ReviewActions.editReview, (state, { review }) => {
    const uneditedReviews = state.reviews.filter((r) => r.id !== review.id);
    return {
      ...state,
      reviews: [...uneditedReviews, { ...review }],
    };
  }),
  on(ReviewActions.deleteReview, (state, { review }) => {
    const nonDeletedReviews = state.reviews.filter((r) => r.id !== review.id);
    return {
      ...state,
      reviews: [...nonDeletedReviews],
    };
  })
);

export function reviewReducer(
  state: ReviewState | undefined,
  action: Action
): { reviews: Review[] } {
  return reducer(state, action);
}
