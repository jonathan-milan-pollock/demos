import { Action, createReducer, on } from '@ngrx/store';

import { AuthenticationState } from './authentication.state';
import {
  isAuthenticatedResponse,
  loadUserSuccess,
} from '@dark-rush-photography/website/data';

export const authenticationFeatureKey = 'auth';

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  user: undefined,
};

const reducer = createReducer(
  initialState,
  on(isAuthenticatedResponse, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated: isAuthenticated,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
  }))
);

export function authenticationReducer(
  state: AuthenticationState | undefined,
  action: Action
): AuthenticationState {
  return reducer(state, action);
}
