import { Favorites } from '@dark-rush-photography/shared/types';

export interface FavoritesState {
  favorites?: Favorites;
  isLoading: boolean;
  error?: string;
}
