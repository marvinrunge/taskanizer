import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { RootStoreState, TaskActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-listitem',
  templateUrl: './task-listitem.component.html',
  styleUrls: ['./task-listitem.component.scss'],
})
export class TaskListitemComponent {
  @Input() task: Task;
  @Input() showChecked: boolean;

  right = '';
  opacity = '1';
  maxHeight = '200px';

  constructor(private store$: Store<RootStoreState.State>, private router: Router) { }

  onSwipeLeft(e) {
    if (e.direction === 2) {
      this.right = '150%';
      this.maxHeight = '0px';
      setTimeout(() => {
        this.store$.dispatch(
          TaskActions.deleteRequest({ task: this.task })
        );
      }, 800);
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
    if (this.task.isDone === true && this.showChecked === false) {
      this.opacity = '0';
      this.maxHeight = '0px';
    }
    setTimeout(() => {
      this.store$.dispatch(
        TaskActions.updateRequest({ task })
      );
    }, 800);
  }

  hasSubtitle() {
    if (this.task.deadline) {
        return true;
    } else {
        return false;
    }
  }

  editSelectedTask() {
    this.store$.dispatch(
      TaskActions.setSelectedTaskId({ selectedTaskId: this.task._id })
    );
    this.router.navigate(['edit-task']);
  }
}
