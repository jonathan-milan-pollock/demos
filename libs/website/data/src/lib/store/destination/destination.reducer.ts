import { Action, createReducer, on } from '@ngrx/store';

import * as DestinationActions from './destination.actions';
import { destinationAdapter, DestinationState } from './destination.state';

export const destinationFeatureKey = 'destination';

export const initialState: DestinationState = destinationAdapter.getInitialState(
  {
    isLoading: false,
  }
);

export const destinationReducer = createReducer(
  initialState,
  on(DestinationActions.selectDestination, (state, { destinationId }) => ({
    ...state,
    selectedDestinationId: destinationId,
  })),
  on(DestinationActions.loadDestinations, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(DestinationActions.loadDestinationsSuccess, (state, { destinations }) =>
    destinationAdapter.setAll(destinations, {
      ...state,
      selectedDestinationId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(DestinationActions.loadDestinationsFailure, (state, { error }) => ({
    ...state,
    selectedDestinationId: undefined,
    isLoading: false,
    error: error,
  })),
  on(DestinationActions.loadDestination, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(DestinationActions.loadDestinationSuccess, (state, { destination }) =>
    destinationAdapter.setOne(destination, {
      ...state,
      selectedDestinationId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(DestinationActions.loadDestinationFailure, (state, { error }) => ({
    ...state,
    selectedDestinationId: undefined,
    isLoading: false,
    error: error,
  })),
  on(DestinationActions.addDestination, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(DestinationActions.addDestinationSuccess, (state, { destination }) =>
    destinationAdapter.addOne(destination, {
      ...state,
      selectedDestinationId: undefined,
      isLoading: true,
      error: undefined,
    })
  ),
  on(DestinationActions.addDestinationFailure, (state, { error }) => ({
    ...state,
    selectedDestinationId: undefined,
    isLoading: false,
    error: error,
  })),
  on(DestinationActions.updateDestination, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(
    DestinationActions.updateDestinationSuccess,
    (state, { updatedDestination }) =>
      destinationAdapter.updateOne(updatedDestination, {
        ...state,
        selectedDestinationId: undefined,
        isLoading: false,
        error: undefined,
      })
  ),
  on(DestinationActions.updateDestinationFailure, (state, { error }) => ({
    ...state,
    selectedDestinationId: undefined,
    isLoading: false,
    error: error,
  })),
  on(DestinationActions.deleteDestination, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(DestinationActions.deleteDestinationSuccess, (state, { id }) =>
    destinationAdapter.removeOne(id, {
      ...state,
      selectedDestinationId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(DestinationActions.deleteDestinationFailure, (state, { error }) => ({
    ...state,
    selectedDestinationId: undefined,
    isLoading: false,
    error: error,
  }))
);

export function reducer(
  state: DestinationState | undefined,
  action: Action
): DestinationState {
  return destinationReducer(state, action);
}
