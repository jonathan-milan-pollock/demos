/*import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MyFeatureStoreSelectors } from './my-feature-store';

import { MyOtherFeatureStoreSelectors } from './my-other-feature-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  MyFeatureStoreSelectors.selectMyFeatureError,
  MyOtherFeatureStoreSelectors.selectMyOtherFeatureError,
  (myFeatureError: string, myOtherFeatureError: string) => {
    return myFeature || myOtherFeature;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  MyFeatureStoreSelectors.selectMyFeatureIsLoading,
  MyOtherFeatureStoreSelectors.selectMyOtherFeatureIsLoading,
  (myFeature: boolean, myOtherFeature: boolean) => {
    return myFeature || myOtherFeature;
  }
);*/
