import { PublicEntityState } from '@dark-rush-photography/website/data';

export const getPublicEntityIsLoading = (state: PublicEntityState): boolean =>
  state.isLoading;

export const getPublicEntityError = (
  state: PublicEntityState
): string | undefined => state.error;
