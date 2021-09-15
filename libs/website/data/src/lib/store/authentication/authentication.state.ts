import { Auth0User } from '@dark-rush-photography/website/types';

export interface AuthenticationState {
  isAuthenticated: boolean;
  user?: Auth0User;
}
