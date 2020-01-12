import { Action, createReducer, on } from '@ngrx/store';

import * as TaskActions from './actions';
import { TaskState, initialTaskState, taskAdapter } from './state';
import { Update } from '@ngrx/entity';
import { Task } from 'src/app/models';

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
  on(TaskActions.addUpdateSuccess, (state, { task }) => {
    const id = task._id as string;
    const ids = state.ids as string[];
    if (ids.includes(id)) {
      const update: Update<Task> = {
        id: task._id,
        changes: task as Task
      };
      return taskAdapter.updateOne(update, {
        ...state, isLoading: false, error: undefined });
    } else {
      return taskAdapter.upsertOne(task, {
        ...state, isLoading: false, error: undefined });
    }
  }),
  on(TaskActions.deleteRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(TaskActions.deleteSuccess, (state, { id }) => {
    return taskAdapter.removeOne(id, {
      ...state, isLoading: false, error: undefined });
  }),
  on(TaskActions.deleteFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(TaskActions.addRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(TaskActions.addSuccess, state => ({
    ...state, isLoading: false, error: undefined
  })),
  on(TaskActions.addFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(TaskActions.resetRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(TaskActions.resetSuccess, state => {
    return taskAdapter.removeAll({
      ...state, isLoading: false, error: undefined
    });
  }),
  on(TaskActions.resetFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
);

export function taskreducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}
