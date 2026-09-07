import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskStore } from 'src/app/services/task-store.service';

@Component({
  standalone: false,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[];
  @Input() draggable: boolean;
  @Input() showChecked: boolean;

  constructor(private taskStore: TaskStore) { }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks.forEach((task, index) => {
      if (index !== task.index) {
        task.index = index;
        void this.taskStore.update(task);
      }
    });
  }
}
