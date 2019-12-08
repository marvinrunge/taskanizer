import { Component } from '@angular/core';
import { Task } from 'src/app/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TaskActions, TaskSelectors } from 'src/app/root-store';

@Component({
  selector: 'app-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['lists.page.scss']
})
export class ListsPage {
  tasks$: Observable<Task[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>) {
    this.store$.dispatch(
      TaskActions.loadRequest()
    );

    this.tasks$ = this.store$.pipe(
      select(TaskSelectors.selectAllTasks)
    );

    this.error$ = this.store$.pipe(
      select(TaskSelectors.selectTaskError)
    );

    this.isLoading$ = this.store$.pipe(
      select(TaskSelectors.selectTaskIsLoading)
    );
  }

  addTask() {
    const task = new Task();
    task._id = undefined;
    task.title = 'E-Mail beantworten';
    task.details = undefined;
    task.duration = '3d verbleibend';
    task.level = 0;
    task.priority = 3;
    task.reminder = true;
    task.repeat = true;
    task.attachment = true;
    task.mainTask = true;
    task.tags = ['Etikett 1', 'Etikett 2'];
    this.store$.dispatch(
      TaskActions.addRequest({ task })
    );
  }
}

