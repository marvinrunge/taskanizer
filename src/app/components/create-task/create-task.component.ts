import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { RootStoreState, TaskActions, TaskSelectors } from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { Task } from 'src/app/models';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class TaskCreateComponent implements OnInit {

  @Input() maxIndex;
  @Output() arrowPressed = new EventEmitter<boolean>();
  @ViewChild('titleInput', {static: false}) titleInput: ElementRef;

  constructor(private store$: Store<RootStoreState.State>) { }

  title = '';
  deadline: string;
  details: string;

  createState = false;
  arrowRotation = 'rotate(0deg)';

  ngOnInit() {
  }

  press() {
    this.arrowRotation = this.createState ? 'rotate(0deg)' : 'rotate(180deg)';
    this.arrowPressed.emit(this.createState);
    this.createState = !this.createState;
  }

  addTask() {
    const task = new Task();
    task.title = this.title ;
    task.deadline = this.deadline ? moment(this.deadline) : undefined;
    task.details = this.details;
    task.index = this.maxIndex;
    this.title = '';
    this.titleInput.nativeElement.focus();

    this.store$.dispatch(
      TaskActions.addRequest({ task })
    );
  }
}
