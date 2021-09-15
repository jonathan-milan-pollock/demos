import { Action, createReducer, on } from '@ngrx/store';

import { FavoritesState } from './favorites.state';
import {
  findOneFavorites,
  findOneFavoritesFailure,
  findOneFavoritesSuccess,
} from './favorites.actions';

export const aboutFeatureKey = 'about';

const initialState: FavoritesState = {
  favorites: undefined,
  isLoading: false,
  error: undefined,
};

const reducer = createReducer(
  initialState,
  on(findOneFavorites, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(findOneFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites: { ...favorites },
    isLoading: false,
    error: undefined,
  })),
  on(findOneFavoritesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export function favoritesReducer(
  state: FavoritesState | undefined,
  action: Action
): FavoritesState {
  return reducer(state, action);
}
