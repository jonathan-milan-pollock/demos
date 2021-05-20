import { Action, createReducer, on } from '@ngrx/store';

import * as PhotoOfTheWeekActions from './photo-of-the-week.actions';
import {
  photoOfTheWeekAdapter,
  PhotoOfTheWeekState,
} from './photo-of-the-week.state';

export const photoOfTheWeekFeatureKey = 'photo-of-the-week';

export const initialState: PhotoOfTheWeekState = photoOfTheWeekAdapter.getInitialState(
  {
    isLoading: false,
  }
);

export const photoOfTheWeekReducer = createReducer(
  initialState,
  on(
    PhotoOfTheWeekActions.selectPhotoOfTheWeek,
    (state, { photoOfTheWeekId }) => ({
      ...state,
      selectedPhotoOfTheWeekId: photoOfTheWeekId,
    })
  ),
  on(PhotoOfTheWeekActions.loadPhotoOfTheWeek, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(
    PhotoOfTheWeekActions.loadPhotoOfTheWeekSuccess,
    (state, { photoOfTheWeek }) =>
      photoOfTheWeekAdapter.setAll(photoOfTheWeek, {
        ...state,
        selectedPhotoOfTheWeekId: undefined,
        isLoading: false,
        error: undefined,
      })
  ),
  on(PhotoOfTheWeekActions.loadPhotoOfTheWeekFailure, (state, { error }) => ({
    ...state,
    selectedPhotoOfTheWeekId: undefined,
    isLoading: false,
    error: error,
  })),
  on(PhotoOfTheWeekActions.loadPhotoOfTheWeekImage, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(
    PhotoOfTheWeekActions.loadPhotoOfTheWeekImageSuccess,
    (state, { photoOfTheWeek }) =>
      photoOfTheWeekAdapter.setOne(photoOfTheWeek, {
        ...state,
        selectedPhotoOfTheWeekId: undefined,
        isLoading: false,
        error: undefined,
      })
  ),
  on(
    PhotoOfTheWeekActions.loadPhotoOfTheWeekImageFailure,
    (state, { error }) => ({
      ...state,
      selectedPhotoOfTheWeekId: undefined,
      isLoading: false,
      error: error,
    })
  ),
  on(PhotoOfTheWeekActions.addPhotoOfTheWeek, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(
    PhotoOfTheWeekActions.addPhotoOfTheWeekSuccess,
    (state, { photoOfTheWeek }) =>
      photoOfTheWeekAdapter.addOne(photoOfTheWeek, {
        ...state,
        selectedPhotoOfTheWeekId: undefined,
        isLoading: true,
        error: undefined,
      })
  ),
  on(PhotoOfTheWeekActions.addPhotoOfTheWeekFailure, (state, { error }) => ({
    ...state,
    selectedPhotoOfTheWeekId: undefined,
    isLoading: false,
    error: error,
  })),
  on(PhotoOfTheWeekActions.updatePhotoOfTheWeek, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(
    PhotoOfTheWeekActions.updatePhotoOfTheWeekSuccess,
    (state, { updatedPhotoOfTheWeek }) =>
      photoOfTheWeekAdapter.updateOne(updatedPhotoOfTheWeek, {
        ...state,
        selectedPhotoOfTheWeekId: undefined,
        isLoading: false,
        error: undefined,
      })
  ),
  on(PhotoOfTheWeekActions.updatePhotoOfTheWeekFailure, (state, { error }) => ({
    ...state,
    selectedPhotoOfTheWeekId: undefined,
    isLoading: false,
    error: error,
  })),
  on(PhotoOfTheWeekActions.deletePhotoOfTheWeek, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(PhotoOfTheWeekActions.deletePhotoOfTheWeekSuccess, (state, { id }) =>
    photoOfTheWeekAdapter.removeOne(id, {
      ...state,
      selectedPhotoOfTheWeekId: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(PhotoOfTheWeekActions.deletePhotoOfTheWeekFailure, (state, { error }) => ({
    ...state,
    selectedPhotoOfTheWeekId: undefined,
    isLoading: false,
    error: error,
  }))
);

export function reducer(
  state: PhotoOfTheWeekState | undefined,
  action: Action
): PhotoOfTheWeekState {
  return photoOfTheWeekReducer(state, action);
}
