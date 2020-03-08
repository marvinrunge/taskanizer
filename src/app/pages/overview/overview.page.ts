import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models';
import { TaskSelectors, RootStoreState } from 'src/app/root-store';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-overview',
  templateUrl: 'overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPage {
  tasks$: Observable<Task[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  maxDeadline: moment.Moment = moment().add(1, 'd');
  minDeadline: moment.Moment = moment().startOf('day');
  title = 'relevant';

  searchbarMaxHeight = '0px';
  showDoneTasks = false;
  searchMode = false;

  constructor(
    private store$: Store<RootStoreState.State>) {
    this.selectMaxDeadline(this.title);

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
      this.minDeadline = moment().startOf('day');
      this.maxDeadline = moment().endOf('day');
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksOrderedByDeadline(this.showDoneTasks, this.minDeadline, this.maxDeadline))
      );
    } else if (deadline === 'week') {
      this.title = 'week';
      this.minDeadline = moment().startOf('day');
      this.maxDeadline = moment().add(7, 'd').endOf('day');
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksOrderedByDeadline(this.showDoneTasks, this.minDeadline, this.maxDeadline))
      );
    } else if (deadline === 'overdue') {
      this.title = 'overdue';
      this.minDeadline = moment().subtract(10, 'y').startOf('day');
      this.maxDeadline = moment();
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksOrderedByDeadline(this.showDoneTasks, this.minDeadline, this.maxDeadline))
      );
    } else if (deadline === 'withoutDeadline') {
      this.title = 'withoutDeadline';
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksWithoutDeadlineOrderedByTitle(this.showDoneTasks))
      );
    } else if (deadline === 'relevant') {
      this.title = 'relevant';
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectRelevantTasks(this.showDoneTasks))
      );
    } else if (deadline === 'all') {
      this.title = 'all';
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksOrderedByTitle(this.showDoneTasks))
      );
    }
  }

  toggleSearchMode() {
    this.searchMode = !this.searchMode;
    if (this.searchMode === false) {
      this.searchbarMaxHeight = '0px';
      setTimeout(() => {
        this.selectMaxDeadline(this.title);
      }, 500);
    } else {
      this.searchbar.setFocus();
      this.searchbarMaxHeight = '58px';
      setTimeout(() => {
        this.tasks$ = this.store$.pipe(
          select(TaskSelectors.selectTasksByName(''))
        );
      }, 500);
    }
  }

  search(event) {
    if (this.searchMode) {
      let searchTerm = event.target.value;
      if (searchTerm === '*') {
        searchTerm = '';
      }
      this.tasks$ = this.store$.pipe(
        select(TaskSelectors.selectTasksByName(searchTerm))
      );
    }
  }

  toggleShowDoneTasks() {
    setTimeout(() => {
      this.showDoneTasks = !this.showDoneTasks;
      this.selectMaxDeadline(this.title);
    }, 200);
  }
}
