import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RootStoreState, TaskActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[];
  @Input() draggable: boolean;
  @Input() showChecked: boolean;

  constructor(private store$: Store<RootStoreState.State>) { }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks.forEach((task, index) => {
      if (index !== task.index) {
        task.index = index;
        this.store$.dispatch(
          TaskActions.updateRequest({ task })
        );
      }
    });
  }
}
