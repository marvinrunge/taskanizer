import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { RootStoreState, TaskActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class TaskCreateComponent implements OnInit {

  @Input() maxIndex: number;
  @Input() task: Task;
  @Input() update: Observable<void>;
  @Output() voted = new EventEmitter<boolean>();
  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;

  constructor(private store$: Store<RootStoreState.State>, private navCtrl: NavController) {
  }

  title = '';
  deadline: Date;
  time: string;
  details: string;

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
      this.titleInput.nativeElement.focus();

      this.store$.dispatch(
        TaskActions.addRequest({ task })
      );
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
    this.updateSubscription.unsubscribe();
  }
}
