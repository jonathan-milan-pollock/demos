import { Action, createReducer, on } from '@ngrx/store';

import * as ReviewActions from './review.actions';
import { reviewAdapter, ReviewState } from './review.state';

export const reviewFeatureKey = 'review';

export const initialState: ReviewState = reviewAdapter.getInitialState({
  isLoading: false,
});

export const reviewReducer = createReducer(
  initialState,
  on(ReviewActions.selectReview, (state, { reviewId }) => ({
    ...state,
    selectedReviewId: reviewId,
  })),
  on(ReviewActions.loadReviews, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(ReviewActions.loadReviewsSuccess, (state, { reviews }) =>
    reviewAdapter.setAll(reviews, {
      ...state,
      selectedReviewId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(ReviewActions.loadReviewsFailure, (state, { error }) => ({
    ...state,
    selectedReviewId: undefined,
    isLoading: false,
    error: error,
  })),
  on(ReviewActions.loadReview, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(ReviewActions.loadReviewSuccess, (state, { review }) =>
    reviewAdapter.setOne(review, {
      ...state,
      selectedReviewId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(ReviewActions.loadReviewFailure, (state, { error }) => ({
    ...state,
    selectedReviewId: undefined,
    isLoading: false,
    error: error,
  })),
  on(ReviewActions.addReview, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(ReviewActions.addReviewSuccess, (state, { review }) =>
    reviewAdapter.addOne(review, {
      ...state,
      selectedReviewId: undefined,
      isLoading: true,
      error: undefined,
    })
  ),
  on(ReviewActions.addReviewFailure, (state, { error }) => ({
    ...state,
    selectedReviewId: undefined,
    isLoading: false,
    error: error,
  })),
  on(ReviewActions.updateReview, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(ReviewActions.updateReviewSuccess, (state, { updatedReview }) =>
    reviewAdapter.updateOne(updatedReview, {
      ...state,
      selectedReviewId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(ReviewActions.updateReviewFailure, (state, { error }) => ({
    ...state,
    selectedReviewId: undefined,
    isLoading: false,
    error: error,
  })),
  on(ReviewActions.deleteReview, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(ReviewActions.deleteReviewSuccess, (state, { id }) =>
    reviewAdapter.removeOne(id, {
      ...state,
      selectedReviewId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(ReviewActions.deleteReviewFailure, (state, { error }) => ({
    ...state,
    selectedReviewId: undefined,
    isLoading: false,
    error: error,
  }))
);

export function reducer(
  state: ReviewState | undefined,
  action: Action
): ReviewState {
  return reviewReducer(state, action);
}
