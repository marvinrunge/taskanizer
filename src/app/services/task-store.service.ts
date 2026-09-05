import { computed, Injectable, signal } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Task } from '../models';
import { TaskService } from './task.service';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly taskList = signal<Task[]>([]);
  private readonly selectedTaskId = signal<string | undefined>(undefined);
  private taskSubscription?: Subscription;

  readonly tasks = this.taskList.asReadonly();
  readonly isLoading = signal(false);
  readonly error = signal<string | undefined>(undefined);
  readonly maxIndex = computed(() => this.taskList().length);
  readonly selectedTask = computed(() =>
    this.taskList().find(task => task._id === this.selectedTaskId())
  );

  constructor(private taskService: TaskService) {}

  load(): void {
    this.taskSubscription?.unsubscribe();
    this.isLoading.set(true);
    this.error.set(undefined);
    this.taskSubscription = this.taskService.getAll().subscribe({
      next: tasks => {
        this.taskList.set([...tasks].sort((a, b) => a.index - b.index));
        this.isLoading.set(false);
      },
      error: error => {
        this.error.set(this.messageFor(error));
        this.isLoading.set(false);
      }
    });
  }

  reset(): void {
    this.taskSubscription?.unsubscribe();
    this.taskSubscription = undefined;
    this.taskList.set([]);
    this.selectedTaskId.set(undefined);
    this.error.set(undefined);
    this.isLoading.set(false);
  }

  async add(task: Task): Promise<void> {
    await this.run(() => this.taskService.add(task));
  }

  async update(task: Task): Promise<void> {
    await this.run(() => this.taskService.update(task));
  }

  async delete(task: Task): Promise<void> {
    await this.run(() => this.taskService.delete(task));
  }

  selectTask(id?: string): void {
    this.selectedTaskId.set(id);
  }

  doneTasks(showDone: boolean): Task[] {
    return this.taskList().filter(task => showDone || !task.isDone);
  }

  orderedByTitle(showDone: boolean): Task[] {
    return [...this.doneTasks(showDone)].sort((a, b) => a.title.localeCompare(b.title));
  }

  withoutDeadline(showDone: boolean): Task[] {
    return this.doneTasks(showDone).filter(task => !task.deadline);
  }

  byTimeSpan(showDone: boolean, min: moment.Moment, max: moment.Moment): Task[] {
    return this.doneTasks(showDone)
      .filter(task => task.deadline?.isBetween(min, max, undefined, '[]'))
      .sort((a, b) => a.deadline!.diff(b.deadline!));
  }

  relevant(showDone: boolean): Task[] {
    return this.byTimeSpan(showDone, moment().subtract(10, 'years'), moment().add(7, 'days'))
      .concat(this.withoutDeadline(showDone));
  }

  byName(searchTerm: string): Task[] {
    const normalizedTerm = searchTerm.toLowerCase();
    return this.taskList().filter(task => task.title.toLowerCase().includes(normalizedTerm));
  }

  private async run(operation: () => Promise<void>): Promise<void> {
    this.isLoading.set(true);
    this.error.set(undefined);
    try {
      await operation();
    } catch (error) {
      this.error.set(this.messageFor(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  private messageFor(error: unknown): string {
    return error instanceof Error ? error.message : 'Task operation failed';
  }
}
