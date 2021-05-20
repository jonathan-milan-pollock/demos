import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';

export const selectPhotoOfTheWeek = createAction(
  '[Photo of the Week] Select Photo of the Week0',
  props<{ photoOfTheWeekId: string }>()
);

export const loadPhotoOfTheWeek = createAction(
  '[Photo of the Week] Load Photo of the Week'
);

export const loadPhotoOfTheWeekSuccess = createAction(
  '[Photo of the Week] Load Photo of the Week Success',
  props<{ photoOfTheWeek: PhotoOfTheWeek[] }>()
);

export const loadPhotoOfTheWeekFailure = createAction(
  '[Photo of the Week] Load Photo of the Week Failure',
  props<{ error: string }>()
);

export const loadPhotoOfTheWeekImage = createAction(
  '[Photo of the Week] Load Photo of the Week Image',
  props<{ id: string }>()
);

export const loadPhotoOfTheWeekImageSuccess = createAction(
  '[Photo of the Week] Load Photo of the Week Image Success',
  props<{ photoOfTheWeek: PhotoOfTheWeek }>()
);

export const loadPhotoOfTheWeekImageFailure = createAction(
  '[Photo of the Week] Load Photo of the Week Image Failure',
  props<{ error: string }>()
);

export const addPhotoOfTheWeek = createAction(
  '[Photo of the Week] Add Photo of the Week',
  props<{ photoOfTheWeek: PhotoOfTheWeek }>()
);

export const addPhotoOfTheWeekSuccess = createAction(
  '[Photo of the Week] Add Photo of the Week Success',
  props<{ photoOfTheWeek: PhotoOfTheWeek }>()
);

export const addPhotoOfTheWeekFailure = createAction(
  '[Photo of the Week] Add Photo of the Week Failure',
  props<{ error: string }>()
);

export const updatePhotoOfTheWeek = createAction(
  '[Photo of the Week] Update Photo of the Week',
  props<{ photoOfTheWeek: PhotoOfTheWeek }>()
);

export const updatePhotoOfTheWeekSuccess = createAction(
  '[Photo of the Week] Update Photo of the Week Success',
  props<{ updatedPhotoOfTheWeek: Update<PhotoOfTheWeek> }>()
);

export const updatePhotoOfTheWeekFailure = createAction(
  '[Photo of the Week] Update Photo of the Week Failure',
  props<{ error: string }>()
);

export const deletePhotoOfTheWeek = createAction(
  '[Photo of the Week] Delete Photo of the Week',
  props<{ id: string }>()
);

export const deletePhotoOfTheWeekSuccess = createAction(
  '[Photo of the Week] Delete Photo of the Week Success',
  props<{ id: string }>()
);

export const deletePhotoOfTheWeekFailure = createAction(
  '[Photo of the Week] Delete Photo of the Week Failure',
  props<{ error: string }>()
);
