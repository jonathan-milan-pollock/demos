import { About } from '@dark-rush-photography/shared/types';

export interface AboutState {
  abouts: About[];
  isLoading: boolean;
  error?: string;
}
