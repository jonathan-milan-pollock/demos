import { reviewAdapter, ReviewState } from './review.state';

const { selectAll, selectEntities, selectIds, selectTotal } =
  reviewAdapter.getSelectors();
export const selectAllReviews = selectAll;
export const selectReviews = selectEntities;
export const selectReviewIds = selectIds;
export const selectReviewTotal = selectTotal;

export const getReviewIsLoading = (state: ReviewState): boolean =>
  state.isLoading;

export const getReviewError = (state: ReviewState): string | undefined =>
  state.error;
