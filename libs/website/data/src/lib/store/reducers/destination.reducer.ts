import { Action, createReducer, on } from '@ngrx/store';

import { Destination } from '@dark-rush-photography/shared-types';
import * as DestinationActions from '../actions/destination.actions';

export const destinationFeatureKey = 'destination';

export interface DestinationState {
  destinations: Destination[];
}

const initialState: DestinationState = {
  destinations: [],
};

const reducer = createReducer(
  initialState,
  on(DestinationActions.loadDestinations, (state) => ({
    ...state,
    destinations: [...state.destinations],
  }))
);

export function destinationReducer(
  state: DestinationState | undefined,
  action: Action
): { destinations: Destination[] } {
  return reducer(state, action);
}
