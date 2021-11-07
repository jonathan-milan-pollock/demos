import { createAction, props } from '@ngrx/store';

import {
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';

export const findAllPublicEntities = createAction(
  '[EntityPublic] Find All Public Entities',
  props<{ entityType: EntityType }>()
);

export const findAllPublicEntitiesSuccess = createAction(
  '[EntityPublic] Find All Public Entities Success',
  props<{ publicEntities: EntityMinimalPublic[] }>()
);

export const findAllPublicEntitiesFailure = createAction(
  '[PublicEntity] Load Public Entities Failure',
  props<{ error: string }>()
);

export const findOnePublicEntity = createAction(
  '[PublicEntity] Find One Public Entity',
  props<{ entityId: string }>()
);

export const findOnePublicEntitySuccess = createAction(
  '[PublicEntity] Find One Public Entity Success',
  props<{ publicEntity: EntityPublic }>()
);

export const findOnePublicEntityFailure = createAction(
  '[Destination] Find One Public Entity Failure',
  props<{ error: string }>()
);
