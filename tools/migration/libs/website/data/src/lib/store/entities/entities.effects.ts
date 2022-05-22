import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as EntitiesActions from './entities.actions';
import { EntitiesService } from './entities.service';

@Injectable()
export class EntitiesEffects {
  constructor(
    private actions$: Actions,
    private entitiesService: EntitiesService
  ) {}

  findMinimalEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntitiesActions.findMinimalEntities),
      mergeMap((action) =>
        this.entitiesService.findAllPublicEntities$(action.entityType).pipe(
          map((entityFindAllPublicResponse) =>
            EntitiesActions.findMinimalEntitiesSuccess({
              entityFindAllPublicResponse,
            })
          ),
          catchError((error) =>
            of(EntitiesActions.findMinimalEntitiesFailure(error))
          )
        )
      )
    )
  );

  findEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntitiesActions.findEntity),
      mergeMap((action) =>
        this.entitiesService.findOnePublicEntity$(action.entityId).pipe(
          map((entityFindOnePublicResponse) =>
            EntitiesActions.findEntitySuccess({ entityFindOnePublicResponse })
          ),
          catchError((error) => of(EntitiesActions.findOneEntityFailure(error)))
        )
      )
    )
  );
}
