import { Action, createReducer, on } from '@ngrx/store';

import { AnjuChowdhury } from '../../mock/reviews/AnjuChowdhury';
import { BrianWalkabout } from '../../mock/reviews/BrianWalkabout';
import { CeliaQuillian } from '../../mock/reviews/CeliaQuillian';
import { CynthiaSwann } from '../../mock/reviews/CynthiaSwann';
import { DonnaJeffries } from '../../mock/reviews/DonnaJeffries';
import { ErikLing } from '../../mock/reviews/ErikLing';
import { KendraPoe } from '../../mock/reviews/KendraPoe';
import { LindsayLevin } from '../../mock/reviews/LindsayLevin';
import { RonnieColquitt } from '../../mock/reviews/RonnieColquitt';

import { Review } from '@dark-rush-photography/shared-types';
import * as ReviewActions from '../actions/review.actions';

export const reviewFeatureKey = 'review';

export interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [
    AnjuChowdhury.of(),
    BrianWalkabout.of(),
    CeliaQuillian.of(),
    CynthiaSwann.of(),
    DonnaJeffries.of(),
    ErikLing.of(),
    KendraPoe.of(),
    LindsayLevin.of(),
    RonnieColquitt.of(),
  ],
};

const reducer = createReducer(
  initialState,
  on(ReviewActions.addReview, (state, { review }) => ({
    ...state,
    reviews: [...state.reviews, { ...review }],
  })),
  on(ReviewActions.editReview, (state, { review }) => {
    const uneditedReviews = state.reviews.filter((r) => r.slug !== review.slug);
    return {
      ...state,
      reviews: [...uneditedReviews, { ...review }],
    };
  }),
  on(ReviewActions.deleteReview, (state, { review }) => {
    const nonDeletedReviews = state.reviews.filter(
      (r) => r.slug !== review.slug
    );
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
