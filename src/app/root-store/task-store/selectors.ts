import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { taskreducer } from './reducer';
import * as fromTasks from './state';

export interface State {
  projects: fromTasks.TaskState;
}

/** https://stackoverflow.com/questions/47406386/cannot-read-property-of-map-of-undefined-when-using-featureselector-ngrx */
export const reducers: ActionReducerMap<State> = {
  projects: taskreducer
};

export const selectTaskState = createFeatureSelector<fromTasks.TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  fromTasks.selectAllTasks
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state: fromTasks.TaskState) => state.error
);

export const selectTaskIsLoading = createSelector(
  selectTaskState,
  (state: fromTasks.TaskState) => state.isLoading
);
