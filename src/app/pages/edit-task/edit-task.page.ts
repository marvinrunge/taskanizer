import { Component } from '@angular/core';
import { Task } from 'src/app/models';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TaskSelectors } from 'src/app/root-store';

@Component({
  selector: 'app-edit-task',
  templateUrl: 'edit-task.page.html',
  styleUrls: ['edit-task.page.scss']
})
export class EditTaskPage {
  task$: Observable<Task>;

  saveEvents: Subject<void> = new Subject<void>();

  emitSave() {
    this.saveEvents.next();
  }

  constructor(private store$: Store<RootStoreState.State>) {
    this.task$ = this.store$.pipe(
      select(TaskSelectors.selectTaskBySelectedId)
    );
  }
}

