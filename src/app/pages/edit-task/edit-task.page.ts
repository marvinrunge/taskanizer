import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskStore } from 'src/app/services/task-store.service';

@Component({
  standalone: false,
  selector: 'app-edit-task',
  templateUrl: 'edit-task.page.html',
  styleUrls: ['edit-task.page.scss']
})
export class EditTaskPage {
  readonly task = this.taskStore.selectedTask;

  saveEvents: Subject<void> = new Subject<void>();

  emitSave() {
    this.saveEvents.next();
  }

  constructor(private taskStore: TaskStore) {}
}
