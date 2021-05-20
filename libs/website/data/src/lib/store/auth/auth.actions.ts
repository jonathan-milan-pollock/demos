import { createAction, props } from '@ngrx/store';

import { Auth0User } from '@dark-rush-photography/website/types';

export const loadIsAuthenticated = createAction('[Auth] Load IsAuthenticated');

export const loadIsAuthenticatedSuccess = createAction(
  '[Auth] Load IsAuthenticated Success',
  props<{ isAuthenticated: boolean }>()
);

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: Auth0User }>()
);

export const loginWithRedirect = createAction('[Auth] Login With Redirect');

export const logout = createAction('[Auth] Logout');
