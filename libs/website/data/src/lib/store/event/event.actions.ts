import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Event } from '@dark-rush-photography/shared/types';

export const selectEvent = createAction(
  '[Event] Select Event',
  props<{ eventId: string }>()
);

export const loadEvents = createAction('[Event] Load Events');

export const loadEventsSuccess = createAction(
  '[Event] Load Events Success',
  props<{ events: Event[] }>()
);

export const loadEventsFailure = createAction(
  '[Event] Load Events Failure',
  props<{ error: string }>()
);

export const loadEvent = createAction(
  '[Event] Load Event',
  props<{ id: string }>()
);

export const loadEventSuccess = createAction(
  '[Event] Load Event Success',
  props<{ event: Event }>()
);

export const loadEventFailure = createAction(
  '[Event] Load Event Failure',
  props<{ error: string }>()
);

export const addEvent = createAction(
  '[Event] Add Event',
  props<{ event: Event }>()
);

export const addEventSuccess = createAction(
  '[Event] Add Event Success',
  props<{ event: Event }>()
);

export const addEventFailure = createAction(
  '[Event] Add Event Failure',
  props<{ error: string }>()
);

export const updateEvent = createAction(
  '[Event] Update Event',
  props<{ event: Event }>()
);

export const updateEventSuccess = createAction(
  '[Event] Update Event Success',
  props<{ updatedEvent: Update<Event> }>()
);

export const updateEventFailure = createAction(
  '[Event] Update Event Failure',
  props<{ error: string }>()
);

export const deleteEvent = createAction(
  '[Event] Delete Event',
  props<{ id: string }>()
);

export const deleteEventSuccess = createAction(
  '[Event] Delete Event Success',
  props<{ id: string }>()
);

export const deleteEventFailure = createAction(
  '[Event] Delete Event Failure',
  props<{ error: string }>()
);
