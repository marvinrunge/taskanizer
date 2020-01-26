import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { RootStoreState, TaskActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models';
import * as moment from 'moment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class TaskCreateComponent implements OnInit {

  @Input() maxIndex: number;
  @Input() editMode: boolean;
  @Output() handlePress = new EventEmitter<boolean>();
  @ViewChild('titleInput', {static: false}) titleInput: ElementRef;

  constructor(private store$: Store<RootStoreState.State>) {
    
  }

  title = '';
  deadline: string;
  time: string;
  details: string;

  scrollUp = true;

  ngOnInit() {
  }

  scrollToBottom() {
    if (this.scrollUp) {
      console.log('up');
      document.getElementById('create').scrollIntoView({block: 'end', behavior: 'smooth'});
    } else {
      console.log('down');
      document.getElementById('header').scrollIntoView({block: 'end', behavior: 'smooth'});
    }
    
    this.scrollUp = !this.scrollUp;
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

  getMinDate() {
    return moment().toDate();
  }
}
