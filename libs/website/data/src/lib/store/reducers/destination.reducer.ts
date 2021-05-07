import { Action, createReducer, on } from '@ngrx/store';

import { Destination } from '@dark-rush-photography/shared-types';

export interface DestinationState {
  destinations: Destination[];
}

const initialState: DestinationState = {
  destinations: [],
};

const reducer = createReducer(initialState);

export function destinationReducer(
  state: DestinationState | undefined,
  action: Action
): { destinations: Destination[] } {
  return reducer(state, action);
}
