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


export const selectMaxIndex = createSelector(
  selectAllTasks,
  tasks => tasks.length
);

export const selectDoneTasks = (value: boolean) => createSelector(
  selectAllTasks,
  tasks => tasks.filter(
    task => (task.isDone === value || task.isDone === false))
);

export const selectTasksOrderedByTitle = (value: boolean) => createSelector(
  selectDoneTasks(value),
  tasks => tasks.sort(
    (a, b) => a.title.localeCompare(b.title))
);

export const selectTasksWithoutDeadline = (value: boolean) => createSelector(
  selectDoneTasks(value),
  tasks => tasks.filter(
    task => (!task.deadline))
);

export const selectTasksWithoutDeadlineOrderedByTitle = (value: boolean) => createSelector(
  selectTasksWithoutDeadline(value),
  tasks => tasks.sort(
    (a, b) => a.title.localeCompare(b.title))
);

export const selectTasksByMaxDeadline = (value: boolean, min: moment.Moment, max: moment.Moment) => createSelector(
  selectDoneTasks(value),
  tasks => tasks.filter(
    task => task.deadline ? task.deadline.isBefore(max) && task.deadline.isAfter(min) : false)
);

export const selectTasksOrderedByDeadline = (value: boolean, min: moment.Moment, max: moment.Moment) => createSelector(
  selectTasksByMaxDeadline(value, min, max),
  tasks => tasks.sort(
    (a, b) => a.deadline.diff(b.deadline))
);

export const selectTasksByName = (substring: string) => createSelector(
  selectAllTasks,
  tasks => tasks.filter(
    task => task.title.includes(substring))
);
