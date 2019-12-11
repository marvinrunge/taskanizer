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

  top = 'calc(100vh - 5rem - 3.5rem)';

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

  onSwipeUp(e) {
    this.top = '3.5rem';
  }

  onSwipeDown(e) {
    this.top = 'calc(100vh - 5rem - 3.5rem)';
  }
}

