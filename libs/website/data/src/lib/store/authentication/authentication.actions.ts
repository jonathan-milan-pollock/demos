import { createAction, props } from '@ngrx/store';

import { Auth0User } from '@dark-rush-photography/website/types';

export const loadIsAuthenticated = createAction(
  '[Authentication] Load IsAuthenticated'
);

export const isAuthenticatedResponse = createAction(
  '[Authentication] Load IsAuthenticated Response',
  props<{ isAuthenticated: boolean }>()
);

export const loadUser = createAction('[Authentication] Load User');

export const loadUserSuccess = createAction(
  '[Authentication] Load User Success',
  props<{ user: Auth0User }>()
);

export const loginWithRedirect = createAction('[Auth] Login With Redirect');

export const logout = createAction('[Auth] Logout');
