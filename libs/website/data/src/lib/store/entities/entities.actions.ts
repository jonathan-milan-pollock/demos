import { createAction, props } from '@ngrx/store';

import {
  EntityFindAllPublicResponse,
  EntityFindOnePublicResponse,
  EntityType,
} from '@dark-rush-photography/shared/types';

export const findMinimalEntities = createAction(
  'Find Minimal Entities',
  props<{ entityType: EntityType }>()
);

export const findMinimalEntitiesSuccess = createAction(
  'Find Minimal Entities Success',
  props<{ entityFindAllPublicResponse: EntityFindAllPublicResponse }>()
);

export const findMinimalEntitiesFailure = createAction(
  'Find Minimal Entities Failure',
  props<{ error: string }>()
);

export const findEntity = createAction(
  'Find Entity',
  props<{ entityId: string }>()
);

export const findEntitySuccess = createAction(
  'Find Entity Success',
  props<{ entityFindOnePublicResponse: EntityFindOnePublicResponse }>()
);

export const findOneEntityFailure = createAction(
  'Find Entity Failure',
  props<{ error: string }>()
);

export const addMinimalEntityFromAboutPage = createAction(
  '[About Page] Add Minimal Entity',
  props<{
    entityType: EntityType;
    entityFindAllPublicResponse: EntityFindAllPublicResponse;
  }>()
);

export const addEntityFromAboutPage = createAction(
  '[About Page] Add Entity',
  props<{
    entityType: EntityType;
    entityFindOnePublicResponse: EntityFindOnePublicResponse;
  }>()
);
