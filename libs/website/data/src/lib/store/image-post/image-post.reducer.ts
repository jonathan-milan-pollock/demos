import { Action, createReducer, on } from '@ngrx/store';

import {
  createImagePost,
  createImagePostFailure,
  createImagePostSuccess,
} from './image-post.actions';
import { ImagePostState } from './image-post.state';

export const imagePostFeatureKey = 'imagePost';

const initialState: ImagePostState = {
  imagePosted: false,
  isLoading: false,
  error: undefined,
};

const reducer = createReducer(
  initialState,
  on(createImagePost, (state) => ({
    ...state,
    imagePosted: false,
    isLoading: true,
    error: undefined,
  })),
  on(createImagePostSuccess, (state) => ({
    ...state,
    imagePosted: true,
    isLoading: false,
    error: undefined,
  })),
  on(createImagePostFailure, (state, { error }) => ({
    ...state,
    imagePosted: false,
    isLoading: false,
    error,
  }))
);

export function imagePostReducer(
  state: ImagePostState | undefined,
  action: Action
): ImagePostState {
  return reducer(state, action);
}
