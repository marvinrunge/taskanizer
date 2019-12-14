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

  top = 'calc(100% - 4.5rem)';
  overflowY = 'hidden';

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

  onSwipeUp() {
    this.top = '3.5rem';
    this.overflowY = 'scroll';
  }

  onSwipeDown() {
    this.top = 'calc(100% - 4.5rem)';
    this.overflowY = 'hidden';
  }

  toggle(state: boolean) {
    state ? this.onSwipeDown() : this.onSwipeUp();
  }
}

