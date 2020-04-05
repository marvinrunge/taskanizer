import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { taskreducer } from './reducer';
import * as fromTasks from './state';
import * as moment from 'moment';
import { Task } from 'src/app/models';

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

export const selectSelectedTaskId = createSelector(
  selectTaskState,
  (state: fromTasks.TaskState) => state.selectedTaskId
);

export const selectTaskBySelectedId = createSelector(
  selectAllTasks,
  selectSelectedTaskId,
  (tasks, selectedId) => tasks.filter(task => task._id === selectedId)[0]
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

export const selectTasksByTimeSpan = (value: boolean, min: moment.Moment, max: moment.Moment) => createSelector(
  selectDoneTasks(value),
  tasks => tasks.filter(
    task => task.deadline ? task.deadline.isBetween(min, max) : false)
);

export const selectTasksByTimeSpanAndOrderedByDeadline = (value: boolean, min: moment.Moment, max: moment.Moment) => createSelector(
  selectTasksByTimeSpan(value, min, max),
  tasks => tasks.sort(
    (a, b) => a.deadline.diff(b.deadline))
);

export const selectRelevantTasks = (value: boolean) => createSelector(
  selectTasksByTimeSpanAndOrderedByDeadline(value, moment().subtract(10, 'years'), moment().add(7, 'days')),
  selectTasksWithoutDeadline(value),
  (tasksOrderedByDeadline: Task[], tasksWithoutDeadline: Task[]) =>
    tasksOrderedByDeadline.concat(tasksWithoutDeadline)
);

export const selectTasksByName = (substring: string) => createSelector(
  selectAllTasks,
  tasks => tasks.filter(
    task => task.title.toLowerCase().includes(substring.toLowerCase()))
);
