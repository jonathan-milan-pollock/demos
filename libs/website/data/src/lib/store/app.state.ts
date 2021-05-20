import { authFeatureKey } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { destinationFeatureKey } from './destination/destination.reducer';
import { DestinationState } from './destination/destination.state';
import { eventFeatureKey } from './event/event.reducer';
import { EventState } from './event/event.state';
import { photoOfTheWeekFeatureKey } from './photo-of-the-week/photo-of-the-week.reducer';
import { PhotoOfTheWeekState } from './photo-of-the-week/photo-of-the-week.state';
import { reviewFeatureKey } from './review/review.reducer';
import { ReviewState } from './review/review.state';

export interface AppState {
  [authFeatureKey]: AuthState;
  [destinationFeatureKey]: DestinationState;
  [eventFeatureKey]: EventState;
  [photoOfTheWeekFeatureKey]: PhotoOfTheWeekState;
  review: ReviewState;
}
