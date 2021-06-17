import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, mergeMapTo } from 'rxjs/operators';

import * as EventActions from './event.actions';
import { EventsService } from './events.service';

@Injectable()
export class EventEffects {
  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadEvents),
      mergeMapTo(
        this.eventsService.getAll$().pipe(
          map((events) => EventActions.loadEventsSuccess({ events })),
          catchError((error) => of(EventActions.loadEventsFailure(error)))
        )
      )
    )
  );

  loadEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadEvent),
      mergeMap((action) =>
        this.eventsService.get$(action.id).pipe(
          map((event) => EventActions.loadEventSuccess({ event })),
          catchError((error) => of(EventActions.loadEventFailure(error)))
        )
      )
    )
  );

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.addEvent),
      mergeMap((action) =>
        this.eventsService.add$(action.event).pipe(
          map(
            (event) => EventActions.addEventSuccess({ event }),
            catchError((error) => of(EventActions.addEventFailure(error)))
          )
        )
      )
    )
  );

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateEvent),
      mergeMap((action) =>
        this.eventsService.update$(action.event.id ?? '', action.event).pipe(
          map(
            ({ id, ...changes }) =>
              EventActions.updateEventSuccess({
                updatedEvent: {
                  id: id ?? '',
                  changes,
                },
              }),
            catchError((error) => of(EventActions.updateEventFailure(error)))
          )
        )
      )
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteEvent),
      mergeMap((action) =>
        this.eventsService.delete$(action.id).pipe(
          map(
            (id) => EventActions.deleteEventSuccess({ id }),
            catchError((error) => of(EventActions.updateEventFailure(error)))
          )
        )
      )
    )
  );
}
