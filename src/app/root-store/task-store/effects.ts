import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, concat } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import { TaskService } from '../../services/task.service';

import * as taskActions from './actions';
import { Task } from 'src/app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskRepresentation } from 'src/app/models/taskRepresentation';

@Injectable()
export class TaskStoreEffects {
  constructor(private taskService: TaskService, private actions$: Actions, private snackBar: MatSnackBar) {}

  addRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.addRequest),
      tap(action => from(this.taskService.add(action.task)))
    ), { dispatch: false }
  );

  updateRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.updateRequest),
      tap(action => from(this.taskService.update(action.task)))
    ), { dispatch: false }
  );

  deleteRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.deleteRequest),
      tap(action => from(this.taskService.delete(action.task)))
    ), { dispatch: false }
  );

  loadRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.loadRequest),
      switchMap(() => concat(this.allTasks$, this.changedTasks$))
    )
  );

  allTasks$ = this.taskService.getAll().pipe(
    map(tasks => taskActions.loadSuccess({ tasks })
  ));

  changedTasks$: Observable<Action> = this.taskService.getChanges().pipe(
    map(taskRepresentation => {
      if (taskRepresentation._deleted) {
        return taskActions.deleteSuccess({ id: taskRepresentation._id });
      } else {
        return taskActions.addUpdateSuccess({ task: new Task(taskRepresentation) });
      }
    })
  );
}
