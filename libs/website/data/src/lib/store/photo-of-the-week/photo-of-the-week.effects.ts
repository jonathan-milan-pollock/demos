import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as PhotoOfTheWeekActions from './photo-of-the-week.actions';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Injectable()
export class PhotoOfTheWeekEffects {
  constructor(
    private actions$: Actions,
    private photoOfTheWeeksService: PhotoOfTheWeekService
  ) {}

  loadPhotoOfTheWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoOfTheWeekActions.loadPhotoOfTheWeek),
      mergeMap(() =>
        this.photoOfTheWeeksService.getAll().pipe(
          map((photoOfTheWeek) =>
            PhotoOfTheWeekActions.loadPhotoOfTheWeekSuccess({ photoOfTheWeek })
          ),
          catchError((error) =>
            of(PhotoOfTheWeekActions.loadPhotoOfTheWeekFailure(error))
          )
        )
      )
    )
  );

  loadPhotoOfTheWeekImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoOfTheWeekActions.loadPhotoOfTheWeekImage),
      mergeMap((action) =>
        this.photoOfTheWeeksService.get(action.id).pipe(
          map((photoOfTheWeek) =>
            PhotoOfTheWeekActions.loadPhotoOfTheWeekImageSuccess({
              photoOfTheWeek,
            })
          ),
          catchError((error) =>
            of(PhotoOfTheWeekActions.loadPhotoOfTheWeekImageFailure(error))
          )
        )
      )
    )
  );

  addPhotoOfTheWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoOfTheWeekActions.addPhotoOfTheWeek),
      mergeMap((action) =>
        this.photoOfTheWeeksService.add(action.photoOfTheWeek).pipe(
          map(
            (photoOfTheWeek) =>
              PhotoOfTheWeekActions.addPhotoOfTheWeekSuccess({
                photoOfTheWeek,
              }),
            catchError((error) =>
              of(PhotoOfTheWeekActions.addPhotoOfTheWeekFailure(error))
            )
          )
        )
      )
    )
  );

  updatePhotoOfTheWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoOfTheWeekActions.updatePhotoOfTheWeek),
      mergeMap((action) =>
        this.photoOfTheWeeksService
          .update(action.photoOfTheWeek.id, action.photoOfTheWeek)
          .pipe(
            map(
              ({ id, ...changes }) =>
                PhotoOfTheWeekActions.updatePhotoOfTheWeekSuccess({
                  updatedPhotoOfTheWeek: {
                    id,
                    changes,
                  },
                }),
              catchError((error) =>
                of(PhotoOfTheWeekActions.updatePhotoOfTheWeekFailure(error))
              )
            )
          )
      )
    )
  );

  deletePhotoOfTheWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoOfTheWeekActions.deletePhotoOfTheWeek),
      mergeMap((action) =>
        this.photoOfTheWeeksService.delete(action.id).pipe(
          map(
            (id) => PhotoOfTheWeekActions.deletePhotoOfTheWeekSuccess({ id }),
            catchError((error) =>
              of(PhotoOfTheWeekActions.updatePhotoOfTheWeekFailure(error))
            )
          )
        )
      )
    )
  );
}
