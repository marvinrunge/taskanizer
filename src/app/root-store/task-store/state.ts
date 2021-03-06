import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

import { Task } from '../../models';

/** additional entity state properties */
export interface TaskState extends EntityState<Task> {
  isLoading: boolean;
  error: any;
  selectedTaskId: string;
}

/** function to determine which field to use as a ID inside the store */
export function selectTaskId(task: Task): string {
  return task._id;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: selectTaskId,
  sortComparer: (a: Task, b: Task): number =>
    a.index - b.index
});

export const initialTaskState: TaskState = taskAdapter.getInitialState(
  {
    isLoading: false,
    error: undefined,
    selectedTaskId: undefined
  }
);

/** use some of the selectors implemented by the ngrx store library */
const {
  selectAll
} = taskAdapter.getSelectors();

export const selectAllTasks = selectAll;
