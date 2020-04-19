import { Component } from '@angular/core';
import { Task } from 'src/app/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TaskSelectors } from 'src/app/root-store';

@Component({
  selector: 'app-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['lists.page.scss']
})
export class ListsPage {
  tasks$: Observable<Task[]>;
  maxIndex$: Observable<number>;

  showDoneTasks = false;

  constructor(private store$: Store<RootStoreState.State>) {
    this.tasks$ = this.store$.pipe(
      select(TaskSelectors.selectDoneTasks(this.showDoneTasks))
    );

    this.maxIndex$ = this.store$.pipe(
      select(TaskSelectors.selectMaxIndex)
    );
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

