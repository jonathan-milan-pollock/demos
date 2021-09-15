import { createAction, props } from '@ngrx/store';

import { About } from '@dark-rush-photography/shared/types';

export const findAllAbout = createAction('[About Page] Find All About');

export const findAllAboutSuccess = createAction(
  '[About Find All API Request] Find All About Success',
  props<{ abouts: About[] }>()
);

export const findAllAboutFailure = createAction(
  '[About Find All API Request] Find All About Failure',
  props<{ error: string }>()
);
