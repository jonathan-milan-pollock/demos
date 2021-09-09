import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Review } from '@dark-rush-photography/shared/types';

export const reviewAdapter: EntityAdapter<Review> = createEntityAdapter<Review>(
  {
    selectId: (review: Review): string => (review.id ? review.id : ''),
    sortComparer: (review1: Review, review2: Review): number =>
      review1.title && review2.title
        ? review1.title.localeCompare(review2.title)
        : 0,
  }
);

export interface ReviewState extends EntityState<Review> {
  selectedReviewId?: string;
  isLoading: boolean;
  error?: string;
}
