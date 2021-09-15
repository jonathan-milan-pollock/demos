import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import {
  findAllAbout,
  findAllAboutFailure,
  findAllAboutSuccess,
} from './about.actions';
import { AboutService } from './about.service';

@Injectable()
export class AboutEffects {
  constructor(private actions$: Actions, private aboutService: AboutService) {}

  findAllAbout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(findAllAbout),
      mergeMap(() =>
        this.aboutService.findAll$().pipe(
          map((abouts) => findAllAboutSuccess({ abouts })),
          catchError((error) => of(findAllAboutFailure(error)))
        )
      )
    );
  });
}
