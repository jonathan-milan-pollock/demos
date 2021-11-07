import { Action, createReducer, on } from '@ngrx/store';

import * as EntityPublicActions from './public-entity.actions';
import { PublicEntityState } from './public-entity.state';

export const entityPublicFeatureKey = 'entity-public';

const initialState: PublicEntityState = {
  publicEntities: [],
  publicEntity: undefined,
  isLoading: false,
  error: undefined,
};

export const destinationReducer = createReducer(
  initialState,
  on(EntityPublicActions.findAllPublicEntities, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(
    EntityPublicActions.findAllPublicEntitiesSuccess,
    (state, { publicEntities }) => ({
      ...state,
      publicEntities: publicEntities,
      publicEntity: undefined,
      isLoading: false,
      error: undefined,
    })
  ),
  on(EntityPublicActions.findAllPublicEntitiesFailure, (state, { error }) => ({
    ...state,
    publicEntity: undefined,
    isLoading: false,
    error: error,
  })),
  on(EntityPublicActions.findOnePublicEntity, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(
    EntityPublicActions.findOnePublicEntitySuccess,
    (state, { publicEntity }) => ({
      ...state,
      publicEntity,
      isLoading: false,
      error: undefined,
    })
  ),
  on(EntityPublicActions.findOnePublicEntityFailure, (state, { error }) => ({
    ...state,
    publicEntity: undefined,
    isLoading: false,
    error: error,
  }))
);

export function reducer(
  state: PublicEntityState | undefined,
  action: Action
): PublicEntityState {
  return destinationReducer(state, action);
}
