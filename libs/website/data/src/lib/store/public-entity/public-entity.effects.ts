import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as PublicEntityActions from './public-entity.actions';
import { PublicEntitiesService } from './public-entity.service';

@Injectable()
export class PublicEntityEffects {
  constructor(
    private actions$: Actions,
    private publicEntitiesService: PublicEntitiesService
  ) {}

  findAllEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicEntityActions.findAllPublicEntities),
      mergeMap((action) =>
        this.publicEntitiesService.findAll$(action.entityType).pipe(
          map((destinations) =>
            PublicEntityActions.findAllPublicEntitiesSuccess({
              publicEntities: destinations,
            })
          ),
          catchError((error) =>
            of(PublicEntityActions.findAllPublicEntitiesFailure(error))
          )
        )
      )
    )
  );

  findOneEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicEntityActions.findOnePublicEntity),
      mergeMap((action) =>
        this.publicEntitiesService.findOne$(action.entityId).pipe(
          map((publicEntity) =>
            PublicEntityActions.findOnePublicEntitySuccess({ publicEntity })
          ),
          catchError((error) =>
            of(PublicEntityActions.findOnePublicEntityFailure(error))
          )
        )
      )
    )
  );
}
