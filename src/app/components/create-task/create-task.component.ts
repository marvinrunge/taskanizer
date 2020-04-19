import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { RootStoreState, TaskActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-create-task',
  animations: [
    trigger('add', [
      state('stay', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('flyaway', style({
        transform: 'scale(3)',
        opacity: 0
      })),
      state('gone', style({
        transform: 'scale(0)',
        opacity: 1
      })),
      transition('stay => flyaway', [
        animate('0.6s ease')
      ]),
      transition('flyaway => gone', [
        animate('0s')
      ]),
      transition('gone => stay', [
        animate('0.3s ease')
      ])
    ]),
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class TaskCreateComponent implements OnInit, OnDestroy {

  @Input() maxIndex: number;
  @Input() task: Task;
  @Input() update: Observable<void>;
  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;

  constructor(private store$: Store<RootStoreState.State>, private navCtrl: NavController) {
  }

  title = '';
  deadline: Date;
  time: string;
  details: string;
  added = 'stay';

  private updateSubscription: Subscription;

  ngOnInit() {
    if (this.update !== undefined) {
      this.updateSubscription = this.update.subscribe(() => this.updateTask());
    }
    if (this.task) {
      this.title = this.task.title;
      this.details = this.task.details;
      if (this.task.deadline) {
        this.deadline = this.task.deadline.toDate();
        this.time = this.task.deadline.format('HH:mm');
      }
      if (this.task.details) {
        this.details = this.task.details;
      }
    }
  }

  addTask() {
    if (this.title !== '') {
      const task = new Task();
      task.title = this.title;
      task.isDone = false;

      if (this.deadline && !this.time) {
        task.deadline = moment(this.deadline).startOf('day');
      } else if (this.deadline && this.time) {
        task.deadline = moment(this.deadline).add(this.time.substring(0, 2), 'hours').add(this.time.substring(3, 5), 'minutes');
      }

      task.details = this.details;
      task.index = this.maxIndex;
      this.title = '';
      this.deadline = undefined;
      this.time = undefined;
      this.details = undefined;
      this.titleInput.nativeElement.focus();

      this.store$.dispatch(
        TaskActions.addRequest({ task })
      );

      this.fireAddAnimation();
    }
  }

  updateTask() {
    if (this.title !== '') {
      const task = this.task;
      task.title = this.title;
      task.isDone = false;

      if (this.deadline && !this.time) {
        task.deadline = moment(this.deadline).startOf('day');
      } else if (this.deadline && this.time) {
        task.deadline = moment(this.deadline).add(this.time.substring(0, 2), 'hours').add(this.time.substring(3, 5), 'minutes');
      } else if (this.deadline === undefined) {
        task.deadline = undefined;
      }

      task.details = this.details;
      this.title = '';
      this.titleInput.nativeElement.focus();

      this.store$.dispatch(
        TaskActions.updateRequest({ task })
      );

      this.navCtrl.back();
    }
  }

  fireAddAnimation() {
    setTimeout(() => {
      this.added = 'flyaway';
    }, 0);
    setTimeout(() => {
      this.added = 'gone';
    }, 600);
    setTimeout(() => {
      this.added = 'stay';
    }, 700);
  }

  clearDate() {
    this.deadline = undefined;
    this.time = undefined;
  }

  clearTime() {
    this.time = undefined;
  }

  getMinDate() {
    return moment().toDate();
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
