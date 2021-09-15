import { Action, createReducer, on } from '@ngrx/store';

import { AboutState } from './about.state';
import {
  findAllAbout,
  findAllAboutFailure,
  findAllAboutSuccess,
} from './about.actions';

export const aboutFeatureKey = 'about';

const initialState: AboutState = {
  abouts: [],
  isLoading: false,
  error: undefined,
};

const reducer = createReducer(
  initialState,
  on(findAllAbout, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(findAllAboutSuccess, (state, { abouts }) => ({
    ...state,
    abouts: [...abouts],
    isLoading: false,
    error: undefined,
  })),
  on(findAllAboutFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export function aboutReducer(
  state: AboutState | undefined,
  action: Action
): AboutState {
  return reducer(state, action);
}
