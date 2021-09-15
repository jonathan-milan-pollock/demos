import { createAction, props } from '@ngrx/store';

import { Favorites } from '@dark-rush-photography/shared/types';

export const findOneFavorites = createAction(
  '[Favorites Page] Find One Favorites'
);

export const findOneFavoritesSuccess = createAction(
  '[Favorites Find One API Request] Find One Favorites Success',
  props<{ favorites: Favorites }>()
);

export const findOneFavoritesFailure = createAction(
  '[Favorites Find One API Request] Find One Favorites Failure',
  props<{ error: string }>()
);
