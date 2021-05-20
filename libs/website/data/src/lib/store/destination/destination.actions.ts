import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Destination } from '@dark-rush-photography/shared-types';

export const selectDestination = createAction(
  '[Destination] Select Destination',
  props<{ destinationId: string }>()
);

export const loadDestinations = createAction('[Destination] Load Destinations');

export const loadDestinationsSuccess = createAction(
  '[Destination] Load Destinations Success',
  props<{ destinations: Destination[] }>()
);

export const loadDestinationsFailure = createAction(
  '[Destination] Load Destinations Failure',
  props<{ error: string }>()
);

export const loadDestination = createAction(
  '[Destination] Load Destination',
  props<{ id: string }>()
);

export const loadDestinationSuccess = createAction(
  '[Destination] Load Destination Success',
  props<{ destination: Destination }>()
);

export const loadDestinationFailure = createAction(
  '[Destination] Load Destination Failure',
  props<{ error: string }>()
);

export const addDestination = createAction(
  '[Destination] Add Destination',
  props<{ destination: Destination }>()
);

export const addDestinationSuccess = createAction(
  '[Destination] Add Destination Success',
  props<{ destination: Destination }>()
);

export const addDestinationFailure = createAction(
  '[Destination] Add Destination Failure',
  props<{ error: string }>()
);

export const updateDestination = createAction(
  '[Destination] Update Destination',
  props<{ destination: Destination }>()
);

export const updateDestinationSuccess = createAction(
  '[Destination] Update Destination Success',
  props<{ updatedDestination: Update<Destination> }>()
);

export const updateDestinationFailure = createAction(
  '[Destination] Update Destination Failure',
  props<{ error: string }>()
);

export const deleteDestination = createAction(
  '[Destination] Delete Destination',
  props<{ id: string }>()
);

export const deleteDestinationSuccess = createAction(
  '[Destination] Delete Destination Success',
  props<{ id: string }>()
);

export const deleteDestinationFailure = createAction(
  '[Destination] Delete Destination Failure',
  props<{ error: string }>()
);
