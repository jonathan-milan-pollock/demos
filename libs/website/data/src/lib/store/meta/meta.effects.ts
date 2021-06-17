import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';

import * as MetaActions from './meta.actions';
import { MetaService } from './meta.service';

@Injectable()
export class MetaEffects {
  constructor(private actions$: Actions, private metaService: MetaService) {}

  addMetadataForPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MetaActions.addMetadataForPage),
        mergeMap((action) =>
          this.metaService.addMetadataForPage$(action.page, action.url)
        )
      ),
    { dispatch: false }
  );

  addMetadata$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MetaActions.addMetadata),
        mergeMap((action) =>
          this.metaService.addMetadata$(action.metadata, action.url)
        )
      ),
    { dispatch: false }
  );
}
