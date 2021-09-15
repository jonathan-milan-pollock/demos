import { createAction, props } from '@ngrx/store';

import { ImagePost } from '@dark-rush-photography/shared/types';

export const createImagePost = createAction(
  '[Admin Image Post Page] Create Image Post',
  props<{ imagePost: ImagePost }>()
);

export const createImagePostSuccess = createAction(
  '[Image Post API Request] Create Image Post Success',
  props<{ imagePosted: boolean }>()
);

export const createImagePostFailure = createAction(
  '[Image Post API Request] Create Image Post Failure',
  props<{ error: string }>()
);
