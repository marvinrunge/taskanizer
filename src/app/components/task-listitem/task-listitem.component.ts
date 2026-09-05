import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TaskStore } from 'src/app/services/task-store.service';

@Component({
  standalone: false,
  selector: 'app-task-listitem',
  animations: [
    trigger('delete', [
      state('present', style({
        opacity: 1,
        right: 0,
        maxHeight: '200px'
      })),
      state('left', style({
        opacity: 1,
        right: '100%',
        maxHeight: '200px'
      })),
      state('closed', style({
        opacity: 0,
        maxHeight: '0px'
      })),
      transition('present => left', [
        animate('0.5s ease')
      ]),
      transition('left => closed', [
        animate('0.5s ease')
      ]),
      transition('present => closed', [
        animate('0.5s ease')
      ])
    ]),
  ],
  templateUrl: './task-listitem.component.html',
  styleUrls: ['./task-listitem.component.scss'],
})
export class TaskListitemComponent {
  @Input() task: Task;
  @Input() showChecked: boolean;

  animationState = 'present';

  constructor(private taskStore: TaskStore, private router: Router) { }

  onSwipeLeft(e) {
    if (e.direction === 2) {
      this.animationState = 'left';
      setTimeout(() => {
        void this.taskStore.delete(this.task);
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
    if (this.task.isDone === true && this.showChecked === false) {
      this.animationState = 'closed';
    }
    setTimeout(() => {
      void this.taskStore.update(task);
    }, 500);
  }

  hasSubtitle() {
    if (this.task.deadline) {
        return true;
    } else {
        return false;
    }
  }

  editSelectedTask() {
    this.taskStore.selectTask(this.task._id);
    this.router.navigate(['edit-task']);
  }

  setClosedState() {
    if (this.animationState === 'left') {
      this.animationState = 'closed';
    }
  }
}
