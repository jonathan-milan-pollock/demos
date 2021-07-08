import { createAction, props } from '@ngrx/store';

import { Metadata, Page } from '@dark-rush-photography/website/types';

export const addMetadataForPage$ = createAction(
  '[Meta] Add Metadata for Page',
  props<{ page: Page; url: string }>()
);

export const addMetadata$ = createAction(
  '[Meta] Add Metadata',
  props<{ metadata: Metadata | undefined; url: string }>()
);
