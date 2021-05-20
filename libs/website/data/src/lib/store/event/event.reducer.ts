import { Action, createReducer, on } from '@ngrx/store';

import * as EventActions from './event.actions';
import { eventAdapter, EventState } from './event.state';

export const eventFeatureKey = 'event';

export const initialState: EventState = eventAdapter.getInitialState({
  isLoading: false,
});

export const eventReducer = createReducer(
  initialState,
  on(EventActions.selectEvent, (state, { eventId }) => ({
    ...state,
    selectedEventId: eventId,
  })),
  on(EventActions.loadEvents, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(EventActions.loadEventsSuccess, (state, { events }) =>
    eventAdapter.setAll(events, {
      ...state,
      selectedEventId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(EventActions.loadEventsFailure, (state, { error }) => ({
    ...state,
    selectedEventId: undefined,
    isLoading: false,
    error: error,
  })),
  on(EventActions.loadEvent, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(EventActions.loadEventSuccess, (state, { event }) =>
    eventAdapter.setOne(event, {
      ...state,
      selectedEventId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(EventActions.loadEventFailure, (state, { error }) => ({
    ...state,
    selectedEventId: undefined,
    isLoading: false,
    error: error,
  })),
  on(EventActions.addEvent, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(EventActions.addEventSuccess, (state, { event }) =>
    eventAdapter.addOne(event, {
      ...state,
      selectedEventId: undefined,
      isLoading: true,
      error: undefined,
    })
  ),
  on(EventActions.addEventFailure, (state, { error }) => ({
    ...state,
    selectedEventId: undefined,
    isLoading: false,
    error: error,
  })),
  on(EventActions.updateEvent, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(EventActions.updateEventSuccess, (state, { updatedEvent }) =>
    eventAdapter.updateOne(updatedEvent, {
      ...state,
      selectedEventId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(EventActions.updateEventFailure, (state, { error }) => ({
    ...state,
    selectedEventId: undefined,
    isLoading: false,
    error: error,
  })),
  on(EventActions.deleteEvent, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(EventActions.deleteEventSuccess, (state, { id }) =>
    eventAdapter.removeOne(id, {
      ...state,
      selectedEventId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(EventActions.deleteEventFailure, (state, { error }) => ({
    ...state,
    selectedEventId: undefined,
    isLoading: false,
    error: error,
  }))
);

export function reducer(
  state: EventState | undefined,
  action: Action
): EventState {
  return eventReducer(state, action);
}
