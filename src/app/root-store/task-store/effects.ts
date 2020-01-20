import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, concat } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import { TaskService } from '../../services/task.service';

import * as taskActions from './actions';
import { Task } from 'src/app/models';
import { MatSnackBar } from '@angular/material';

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

  resetRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.resetRequest),
      mergeMap(() => from(this.taskService.reset()).pipe(
        switchMap(() => {
          this.snackBar.open('Reset successful');
          window.location.href = '/';
          return [taskActions.resetSuccess(), taskActions.loadRequest()];
        }),
        catchError(error => of(taskActions.resetFailure({ error })))
      ))
    )
  );


  allTasks$ = this.taskService.getAll().pipe(
    map(tasks => taskActions.loadSuccess({ tasks })));

  changedTasks$: Observable<Action> = this.taskService.getChanges().pipe(
    map(change => {
      if (change.doc._deleted) {
        return taskActions.deleteSuccess({ id: change.doc._id });
      } else {
        return taskActions.addUpdateSuccess({ task: new Task(change.doc) });
      }
    })
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => taskActions.loadRequest())
    )
  );
}
