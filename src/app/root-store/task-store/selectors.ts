import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { taskreducer } from './reducer';
import * as fromTasks from './state';
import * as moment from 'moment';

export interface State {
  tasks: fromTasks.TaskState;
}

/** https://stackoverflow.com/questions/47406386/cannot-read-property-of-map-of-undefined-when-using-featureselector-ngrx */
export const reducers: ActionReducerMap<State> = {
  tasks: taskreducer
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

export const selectTasksByMaxDeadline = (max: moment.Moment) => createSelector(
  selectAllTasks,
  tasks => tasks.filter(
    task => task.deadline ? task.deadline.isBefore(max) : false)
);

export const selectTasksOrderedByDeadline = (max: moment.Moment) => createSelector(
  selectTasksByMaxDeadline(max),
  tasks => tasks.sort(
    (a, b) => a.deadline.diff(b.deadline))
);

export const selectTasksByName = (substring: string) => createSelector(
  selectAllTasks,
  tasks => tasks.filter(
    task => task.title.includes(substring))
);
