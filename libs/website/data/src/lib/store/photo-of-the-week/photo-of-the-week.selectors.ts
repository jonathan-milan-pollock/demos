import {
  photoOfTheWeekAdapter,
  PhotoOfTheWeekState,
} from './photo-of-the-week.state';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = photoOfTheWeekAdapter.getSelectors();
export const selectAllPhotoOfTheWeek = selectAll;
export const selectPhotoOfTheWeekImages = selectEntities;
export const selectPhotoOfTheWeekIds = selectIds;
export const selectPhotoOfTheWeekTotal = selectTotal;

export const getPhotoOfTheWeekIsLoading = (
  state: PhotoOfTheWeekState
): boolean => state.isLoading;

export const getPhotoOfTheWeekError = (
  state: PhotoOfTheWeekState
): string | undefined => state.error;
