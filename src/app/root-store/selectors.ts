import { MemoizedSelector, createSelector } from '@ngrx/store';

import { TaskSelectors } from './task-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  TaskSelectors.selectTaskError,
  (task: string) => { // add new Features with , myOtherFeature: string
    return task; // add new Features with || myOtherFeature
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  TaskSelectors.selectTaskIsLoading,
  (task: boolean) => {
    return task;
  }
);
