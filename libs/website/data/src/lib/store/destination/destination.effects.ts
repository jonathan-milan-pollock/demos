import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as DestinationActions from './destination.actions';
import { DestinationsService } from './destinations.service';

@Injectable()
export class DestinationEffects {
  constructor(
    private actions$: Actions,
    private destinationsService: DestinationsService
  ) {}

  loadDestinations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationActions.loadDestinations),
      mergeMap(() =>
        this.destinationsService.getAll().pipe(
          map((destinations) =>
            DestinationActions.loadDestinationsSuccess({ destinations })
          ),
          catchError((error) =>
            of(DestinationActions.loadDestinationsFailure(error))
          )
        )
      )
    )
  );

  loadDestination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationActions.loadDestination),
      mergeMap((action) =>
        this.destinationsService.get(action.id).pipe(
          map((destination) =>
            DestinationActions.loadDestinationSuccess({ destination })
          ),
          catchError((error) =>
            of(DestinationActions.loadDestinationFailure(error))
          )
        )
      )
    )
  );

  addDestination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationActions.addDestination),
      mergeMap((action) =>
        this.destinationsService.add(action.destination).pipe(
          map(
            (destination) =>
              DestinationActions.addDestinationSuccess({ destination }),
            catchError((error) =>
              of(DestinationActions.addDestinationFailure(error))
            )
          )
        )
      )
    )
  );

  updateDestination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationActions.updateDestination),
      mergeMap((action) =>
        this.destinationsService
          .update(action.destination.id, action.destination)
          .pipe(
            map(
              ({ id, ...changes }) =>
                DestinationActions.updateDestinationSuccess({
                  updatedDestination: {
                    id,
                    changes,
                  },
                }),
              catchError((error) =>
                of(DestinationActions.updateDestinationFailure(error))
              )
            )
          )
      )
    )
  );

  deleteDestination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationActions.deleteDestination),
      mergeMap((action) =>
        this.destinationsService.delete(action.id).pipe(
          map(
            (id) => DestinationActions.deleteDestinationSuccess({ id }),
            catchError((error) =>
              of(DestinationActions.updateDestinationFailure(error))
            )
          )
        )
      )
    )
  );
}
