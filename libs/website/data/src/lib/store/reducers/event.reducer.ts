import { Action, createReducer, on } from '@ngrx/store';

import { Event } from '@dark-rush-photography/shared-types';
import * as EventActions from '../actions/event.actions';

export const eventFeatureKey = 'review';

export interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [],
};

const reducer = createReducer(
  initialState,
  on(EventActions.loadEvents, (state) => ({
    ...state,
    events: [...state.events],
  }))
);

export function eventReducer(
  state: EventState | undefined,
  action: Action
): { events: Event[] } {
  return reducer(state, action);
}
