import { Auth0User } from '@dark-rush-photography/website/types';

export interface AuthState {
  isAuthenticated: boolean;
  user?: Auth0User;
}
