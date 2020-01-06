import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models';
import { TaskSelectors, RootStoreState, TaskActions } from 'src/app/root-store';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';

@Component({
  selector: 'app-overview',
  templateUrl: 'overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPage {

  tasks$: Observable<Task[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  maxDeadline: moment.Moment = moment().add(1, 'd');
  title = 'today';

  searchMode = false;

  constructor(
    private store$: Store<RootStoreState.State>,
    private cd: ChangeDetectorRef) {
    this.tasks$ = this.store$.pipe(
      select(TaskSelectors.selectTasksOrderedByDeadline(this.maxDeadline))
    );

    this.error$ = this.store$.pipe(
      select(TaskSelectors.selectTaskError)
    );

    this.isLoading$ = this.store$.pipe(
      select(TaskSelectors.selectTaskIsLoading)
    );
  }

  selectMaxDeadline(deadline: string) {
    if (deadline === 'today') {
      this.title = 'today';
      this.maxDeadline = moment().add(1, 'd');
    } else if (deadline === 'week') {
      this.title = 'week';
      this.maxDeadline = moment().add(7, 'd');
    } else if (deadline === 'overdue') {
      this.title = 'overdue';
      this.maxDeadline = moment();
    } else if (deadline === 'all') {
      this.title = 'all';
      this.maxDeadline = moment().add(10, 'y');
    }

    this.tasks$ = this.store$.pipe(
      select(TaskSelectors.selectTasksOrderedByDeadline(this.maxDeadline))
    );
  }

  toggleSearchMode() {
    this.searchMode = !this.searchMode;
    if (this.searchMode === false) {
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksOrderedByDeadline(this.maxDeadline))
      );
    }
  }

  search(event) {
    if (this.searchMode) {
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksByName(event.target.value))
      );
    }
  }
}
