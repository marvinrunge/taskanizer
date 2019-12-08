import { Action, createReducer, on } from '@ngrx/store';

import * as TaskActions from './actions';
import { TaskState, initialTaskState, taskAdapter } from './state';

export const taskReducer = createReducer(
  initialTaskState,
  on(TaskActions.loadRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(TaskActions.loadSuccess, (state, { tasks }) => {
    return taskAdapter.upsertMany(tasks, {
      ...state, isLoading: false, error: undefined });
  }),
  on(TaskActions.loadFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(TaskActions.updateSuccess, (state, { task }) => {
    return taskAdapter.upsertOne(task, {
      ...state, isLoading: false, error: undefined });
  }),
  on(TaskActions.deleteSuccess, (state, { id }) => {
    return taskAdapter.removeOne(id, {
      ...state, isLoading: false, error: undefined });
  }),
  on(TaskActions.addRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(TaskActions.addSuccess, state => ({
    ...state, isLoading: false, error: undefined
  })),
  on(TaskActions.addFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  }))
);

export function taskreducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}
