import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, concat } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { TaskService } from '../../services/task.service';

import * as taskActions from './actions';
import { Task } from 'src/app/models';

@Injectable()
export class TaskStoreEffects {
  constructor(private taskService: TaskService, private actions$: Actions) {}

  addRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.addRequest),
      mergeMap(action => from(this.taskService.add(action.task))
        .pipe(
          map(() => taskActions.addSuccess(),
          catchError(error => of(taskActions.addFailure({ error }))))
        )
      )
    )
  );

  loadRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.loadRequest),
      switchMap(() => concat(this.allTasks$, this.changedTasks$))
    )
  );

  allTasks$ = this.taskService.getAll().pipe(
    map(tasks => taskActions.loadSuccess({ tasks })));

  changedTasks$: Observable<Action> = this.taskService.getChanges().pipe(
    map(change => {
      if (change._deleted) {
        return taskActions.deleteSuccess({ id: change._id });
      } else {
        return taskActions.updateSuccess({ task: new Task(change.doc) });
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
