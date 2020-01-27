import { createAction, props } from '@ngrx/store';

import { Task } from '../../models/task';
import { Update } from '@ngrx/entity';

export const loadRequest = createAction('[Task] Load Request');
export const loadFailure = createAction('[Task] Load Failure', props<{error: string}>());
export const loadSuccess = createAction('[Task] Load Success', props<{tasks: Task[]}>());
export const addRequest = createAction('[Task] Add Request', props<{task: Task}>());
export const addFailure = createAction('[Task] Add Failure', props<{error: string}>());
export const addSuccess = createAction('[Task] Add Success');
export const updateRequest = createAction('[Task] Update Request', props<{task: Task}>());
export const updateFailure = createAction('[Task] Update Failure', props<{error: string}>());
export const updateSuccess = createAction('[Task] Update Success', props<{task: Update<Task>}>());
export const addUpdateSuccess = createAction('[Task] Add | Update Success', props<{task: Task}>());
export const deleteRequest = createAction('[Task] Delete Request', props<{task: Task}>());
export const deleteFailure = createAction('[Task] Delete Failure', props<{error: string}>());
export const deleteSuccess = createAction('[Task] Delete Success', props<{id: string}>());
export const resetRequest = createAction('[Task] Reset Request');
export const resetFailure = createAction('[Task] Reset Failure', props<{error: string}>());
export const resetSuccess = createAction('[Task] Reset Success');
export const setSelectedTaskId = createAction('[Task] Set Selected Task Id', props<{selectedTaskId: string}>());
