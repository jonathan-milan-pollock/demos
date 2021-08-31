import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Review } from '@dark-rush-photography/shared/types';

export const reviewAdapter: EntityAdapter<Review> = createEntityAdapter<Review>(
  {
    selectId: (review: Review): string => (review.id ? review.id : ''),
    sortComparer: (review1: Review, review2: Review): number =>
      review1.seoTitle && review2.seoTitle
        ? review1.seoTitle.localeCompare(review2.seoTitle)
        : 0,
  }
);

export interface ReviewState extends EntityState<Review> {
  selectedReviewId?: string;
  isLoading: boolean;
  error?: string;
}
