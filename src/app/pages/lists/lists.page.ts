import { Component } from '@angular/core';
import { Task } from 'src/app/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TaskSelectors } from 'src/app/root-store';
import * as moment from 'moment';

@Component({
  selector: 'app-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['lists.page.scss']
})
export class ListsPage {
  tasks$: Observable<Task[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;
  maxIndex$: Observable<number>;

  top = 'calc(100% - 4.5rem)';
  overflowY = 'hidden';
  showDoneTasks = false;

  constructor(private store$: Store<RootStoreState.State>) {
    this.tasks$ = this.store$.pipe(
      select(TaskSelectors.selectDoneTasks(this.showDoneTasks))
    );

    this.error$ = this.store$.pipe(
      select(TaskSelectors.selectTaskError)
    );

    this.isLoading$ = this.store$.pipe(
      select(TaskSelectors.selectTaskIsLoading)
    );

    this.maxIndex$ = this.store$.pipe(
      select(TaskSelectors.selectMaxIndex)
    );
  }

  onSwipeUp() {
    this.top = '3.5rem';
    this.overflowY = 'auto';
  }

  onSwipeDown() {
    this.top = 'calc(100% - 4.5rem)';
    this.overflowY = 'hidden';
  }

  toggle(state: boolean) {
    state ? this.onSwipeDown() : this.onSwipeUp();
  }

  toggleShowDoneTasks() {
    setTimeout(() => {
      this.showDoneTasks = !this.showDoneTasks;
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectDoneTasks(this.showDoneTasks))
      );
    }, 200);
  }
}

