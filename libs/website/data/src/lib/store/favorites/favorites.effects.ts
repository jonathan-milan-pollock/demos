import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import {
  findOneFavorites,
  findOneFavoritesFailure,
  findOneFavoritesSuccess,
} from './favorites.actions';
import { FavoritesService } from './favorites.service';

@Injectable()
export class AboutEffects {
  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}

  findAllAbout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(findOneFavorites),
      mergeMap(() =>
        this.favoritesService.findOne$().pipe(
          map((favorites) => findOneFavoritesSuccess({ favorites })),
          catchError((error) => of(findOneFavoritesFailure(error)))
        )
      )
    );
  });
}
