import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  createImagePost,
  createImagePostFailure,
  createImagePostSuccess,
} from './image-post.actions';

import { ImagePostService } from './image-post.service';

@Injectable()
export class ImagePostEffects {
  constructor(
    private actions$: Actions,
    private imagePostService: ImagePostService
  ) {}

  createImagePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createImagePost),
      mergeMap((action) =>
        this.imagePostService.create$(action.imagePost).pipe(
          map((imagePosted) => createImagePostSuccess({ imagePosted })),
          catchError((error) => of(createImagePostFailure(error)))
        )
      )
    );
  });
}
