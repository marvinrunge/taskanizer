import { Component, computed, signal } from '@angular/core';
import { TaskStore } from 'src/app/services/task-store.service';

@Component({
  standalone: false,
  selector: 'app-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['lists.page.scss']
})
export class ListsPage {
  readonly showDoneTasks = signal(false);
  readonly tasks = computed(() => this.taskStore.doneTasks(this.showDoneTasks()));
  readonly maxIndex = this.taskStore.maxIndex;

  constructor(private taskStore: TaskStore) {}

  toggleShowDoneTasks() {
    setTimeout(() => {
      this.showDoneTasks.update(value => !value);
    }, 200);
  }
}
