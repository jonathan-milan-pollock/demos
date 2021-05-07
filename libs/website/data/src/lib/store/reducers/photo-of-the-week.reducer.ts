import { Action, createReducer } from '@ngrx/store';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';

export const photoOfTheWeekFeatureKey = 'photoOfTheWeek';

export interface PhotoOfTheWeekState {
  photoOfTheWeek: PhotoOfTheWeek[];
}

const initialState: PhotoOfTheWeekState = {
  photoOfTheWeek: [],
};

const reducer = createReducer(initialState);

export function photoOfTheWeekReducer(
  state: PhotoOfTheWeekState | undefined,
  action: Action
): { photoOfTheWeek: PhotoOfTheWeek[] } {
  return reducer(state, action);
}
