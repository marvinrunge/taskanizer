import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private store$: Store<RootStoreState.State>) { }

  title = '';
  deadline: string;
  details: string;

  onlyAddButton = true;
  borderColor = '#00000000';
  backgroundColor = '#00000000';
  opacity = '0';

  @ViewChild('titleInput', {static: false}) titleInput: ElementRef;

  ngOnInit() {
  }

  addTask() {
    if (this.onlyAddButton) {
      this.onlyAddButton = false;
      this.borderColor = '#00000011';
      this.backgroundColor = '#fff';
      this.opacity = '1';
      this.titleInput.nativeElement.focus();
    } else {
      const task = new Task();
      task.title = this.title ;
      task.deadline = this.deadline ? moment(this.deadline) : undefined;
      task.details = this.details;
      this.title = '';
      this.titleInput.nativeElement.focus();

      console.log(task);

      this.store$.dispatch(
        TaskActions.addRequest({ task })
      );
    }
  }
}
