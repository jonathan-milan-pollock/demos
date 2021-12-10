import { EntitiesState } from './entities.state';

export const getPublicEntityIsLoading = (state: EntitiesState): boolean =>
  state.isLoading;

export const getPublicEntityError = (
  state: EntitiesState
): string | undefined => state.error;
