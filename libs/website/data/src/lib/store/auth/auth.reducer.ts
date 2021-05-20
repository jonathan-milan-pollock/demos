import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  isAuthenticated: false,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.loadIsAuthenticatedSuccess, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated: isAuthenticated,
  })),
  on(AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
