import { eventAdapter, EventState } from './event.state';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = eventAdapter.getSelectors();
export const selectAllEvents = selectAll;
export const selectEvents = selectEntities;
export const selectEventIds = selectIds;
export const selectEventTotal = selectTotal;

export const getEventIsLoading = (state: EventState): boolean =>
  state.isLoading;

export const getEventError = (state: EventState): string | undefined =>
  state.error;
