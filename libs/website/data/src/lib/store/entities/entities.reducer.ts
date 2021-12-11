import { createReducer, on } from '@ngrx/store';

import { EntitiesState } from './entities.state';
import * as EntitiesActions from './entities.actions';

export const entitiesFeatureKey = 'entities';

const initialEntitiesState: EntitiesState = {
  isLoading: false,
  error: undefined,
  entityFindAllPublicResponses: [],
  entityFindOnePublicResponses: [],
};

export const entitiesReducer = createReducer(
  initialEntitiesState,
  on(EntitiesActions.findMinimalEntities, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(EntitiesActions.findMinimalEntitiesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: undefined,
    entityFindAllPublicResponses: [
      ...state.entityFindAllPublicResponses,
      //.filter(
      //  (response) =>
      //    response.entityType !== action.entityFindAllPublicResponse.entityType
      //),
      action.entityFindAllPublicResponse,
    ],
  })),
  on(EntitiesActions.findMinimalEntitiesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(EntitiesActions.findEntity, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(EntitiesActions.findEntitySuccess, (state, action) => ({
    ...state,
    entityFindOnePublicResponses: [
      ...state.entityFindOnePublicResponses.filter(
        (response) =>
          response.publicEntity.id !==
          action.entityFindOnePublicResponse.publicEntity.id
      ),
      action.entityFindOnePublicResponse,
    ],
    isLoading: false,
    error: undefined,
  })),
  on(EntitiesActions.findOneEntityFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
