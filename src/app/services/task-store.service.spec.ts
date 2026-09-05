import { of } from 'rxjs';
import * as moment from 'moment';
import { Task } from '../models';
import { TaskStore } from './task-store.service';
import { TaskService } from './task.service';

describe('TaskStore', () => {
  const tasks = [
    new Task({ _id: '2', title: 'Beta', index: 1, isDone: true }),
    new Task({ _id: '1', title: 'Alpha', index: 0, isDone: false, deadline: moment().add(1, 'day') })
  ];
  let taskService: jasmine.SpyObj<TaskService>;
  let store: TaskStore;

  beforeEach(() => {
    taskService = jasmine.createSpyObj<TaskService>('TaskService', ['getAll', 'add', 'update', 'delete']);
    taskService.getAll.and.returnValue(of(tasks));
    store = new TaskStore(taskService);
  });

  it('loads and orders tasks in signals', () => {
    store.load();

    expect(store.tasks().map(task => task._id)).toEqual(['1', '2']);
    expect(store.maxIndex()).toBe(2);
    expect(store.isLoading()).toBeFalse();
  });

  it('derives filtered task lists without NgRx', () => {
    store.load();

    expect(store.doneTasks(false).map(task => task._id)).toEqual(['1']);
    expect(store.orderedByTitle(true).map(task => task.title)).toEqual(['Alpha', 'Beta']);
    expect(store.withoutDeadline(true).map(task => task._id)).toEqual(['2']);
  });

  it('tracks the selected task with a computed signal', () => {
    store.load();
    store.selectTask('2');

    expect(store.selectedTask()?._id).toBe('2');
  });
});
