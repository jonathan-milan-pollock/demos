import { destinationAdapter, DestinationState } from './destination.state';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = destinationAdapter.getSelectors();
export const selectAllDestinations = selectAll;
export const selectDestinations = selectEntities;
export const selectDestinationIds = selectIds;
export const selectDestinationTotal = selectTotal;

export const getDestinationIsLoading = (state: DestinationState): boolean =>
  state.isLoading;

export const getDestinationError = (
  state: DestinationState
): string | undefined => state.error;
