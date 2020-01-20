import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { RootStoreState, TaskActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-task-listitem',
  templateUrl: './task-listitem.component.html',
  styleUrls: ['./task-listitem.component.scss'],
})
export class TaskListitemComponent implements OnInit {

  @Input() task: Task;
  right = '';
  opacity = '1';
  maxHeight = '200px';

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {}

  onSwipeLeft(e) {
    if (e.direction === 2) {
      this.right = '3.5rem';
      this.opacity = '0';
      this.maxHeight = '0px';
      setTimeout(() => {
        this.store$.dispatch(
          TaskActions.deleteRequest({ task: this.task })
        );
      }, 1000);
    }
  }

  getDueTime() {
    if (this.task.deadline) {
      return moment(this.task.deadline).fromNow();
    } else {
      return '';
    }
  }

  check() {
    const task = this.task;
    task.isDone = this.task.isDone;
    this.store$.dispatch(
      TaskActions.updateRequest({ task })
    );
  }

  hasSubtitle() {
    if (this.task.priority || this.task.deadline || this.task.reminder ||
        this.task.repeat || this.task.attachment || this.task.tags) {
        return true;
    } else {
        return false;
    }
}
}
