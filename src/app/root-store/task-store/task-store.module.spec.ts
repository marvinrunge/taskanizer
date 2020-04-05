import { TaskStoreModule } from './task-store.module';
import { Task } from 'src/app/models';
import { TaskSelectors } from '.';
import moment from 'moment';

describe('TaskStoreModule', () => {
  let taskStoreModule: TaskStoreModule;

  beforeEach(() => {
    taskStoreModule = new TaskStoreModule();
  });

  it('should create an instance', () => {
    expect(taskStoreModule).toBeTruthy();
  });

  it('should return only tasks that are not done', () => {
    const result: Task[] = TaskSelectors.selectDoneTasks(false).projector(
      [
        {
          title: 'task1',
          details: undefined,
          deadline: undefined,
          index: 1,
          isDone: false,
          _id: '1',
          _rev: undefined
        },
        {
          title: 'task2',
          details: undefined,
          deadline: undefined,
          index: 2,
          isDone: true,
          _id: '2',
          _rev: undefined
        },
        {
          title: 'task3',
          details: undefined,
          deadline: undefined,
          index: 3,
          isDone: false,
          _id: '3',
          _rev: undefined
        }
      ]
    );

    const expected: Task[] = [
      {
        title: 'task1',
        details: undefined,
        deadline: undefined,
        index: 1,
        isDone: false,
        _id: '1',
        _rev: undefined

      },
      {
        title: 'task3',
        details: undefined,
        deadline: undefined,
        index: 3,
        isDone: false,
        _id: '3',
        _rev: undefined

      }
    ];

    expect(result.length).toBe(2);
    expect(result[0]).toEqual(expected[0]);
    expect(result[1]).toEqual(expected[1]);
  });

  it('should return tasks ordered by title', () => {
    const result: Task[] = TaskSelectors.selectTasksOrderedByTitle(true).projector(
      [
        {
          title: 'task1',
          details: undefined,
          deadline: undefined,
          index: 1,
          isDone: false,
          _id: '1',
          _rev: undefined
        },
        {
          title: 'task3',
          details: undefined,
          deadline: undefined,
          index: 3,
          isDone: false,
          _id: '3',
          _rev: undefined
        },
        {
          title: 'task2',
          details: undefined,
          deadline: undefined,
          index: 2,
          isDone: true,
          _id: '2',
          _rev: undefined
        }
      ]
    );

    const expected: Task[] = [
      {
        title: 'task1',
        details: undefined,
        deadline: undefined,
        index: 1,
        isDone: false,
        _id: '1',
        _rev: undefined
      },
      {
        title: 'task2',
        details: undefined,
        deadline: undefined,
        index: 2,
        isDone: true,
        _id: '2',
        _rev: undefined
      },
      {
        title: 'task3',
        details: undefined,
        deadline: undefined,
        index: 3,
        isDone: false,
        _id: '3',
        _rev: undefined
      }
    ];

    expect(result.length).toBe(expected.length);
    expect(result[0]).toEqual(expected[0]);
    expect(result[1]).toEqual(expected[1]);
    expect(result[2]).toEqual(expected[2]);
  });

  it('should return only tasks without deadline', () => {
    const deadline = moment();
    const result: Task[] = TaskSelectors.selectTasksWithoutDeadline(false).projector(
      [
        {
          title: 'task3',
          details: undefined,
          deadline: deadline.clone().add(2, 'day'),
          index: 3,
          isDone: false,
          _id: '3',
          _rev: undefined
        },
        {
          title: 'task2',
          details: undefined,
          deadline: undefined,
          index: 2,
          isDone: true,
          _id: '2',
          _rev: undefined
        },
        {
          title: 'task1',
          details: undefined,
          deadline,
          index: 1,
          isDone: false,
          _id: '1',
          _rev: undefined
        }
      ]
    );

    const expected: Task[] = [
      {
        title: 'task2',
        details: undefined,
        deadline: undefined,
        index: 2,
        isDone: true,
        _id: '2',
        _rev: undefined
      }
    ];

    expect(result.length).toBe(expected.length);
    expect(result[0]).toEqual(expected[0]);
  });

  it('should return tasks of a given time span', () => {
    const deadline = moment();
    const result: Task[] = TaskSelectors.selectTasksByTimeSpan(false, deadline.clone().add(1, 'hour'), moment().add(7, 'days')).projector(
      [
        {
          title: 'task3',
          details: undefined,
          deadline: deadline.clone().add(2, 'day'),
          index: 3,
          isDone: false,
          _id: '3',
          _rev: undefined
        },
        {
          title: 'task2',
          details: undefined,
          deadline: deadline.clone().add(1, 'day'),
          index: 2,
          isDone: false,
          _id: '2',
          _rev: undefined
        },
        {
          title: 'task1',
          details: undefined,
          deadline,
          index: 1,
          isDone: false,
          _id: '1',
          _rev: undefined
        }
      ]
    );

    const expected: Task[] = [
      {
        title: 'task3',
        details: undefined,
        deadline: deadline.clone().add(2, 'day'),
        index: 3,
        isDone: false,
        _id: '3',
        _rev: undefined
      },
      {
        title: 'task2',
        details: undefined,
        deadline: deadline.clone().add(1, 'day'),
        index: 2,
        isDone: false,
        _id: '2',
        _rev: undefined
      }
    ];

    expect(result.length).toBe(expected.length);
    expect(result[0]).toEqual(expected[0]);
    expect(result[1]).toEqual(expected[1]);
  });

  it('should return tasks of a given time span and ordered by deadline', () => {
    const deadline = moment();
    const result: Task[] = TaskSelectors.selectTasksByTimeSpanAndOrderedByDeadline(
      false, moment().startOf('day'), moment().add(7, 'days')).projector(
      [
        {
          title: 'task3',
          details: undefined,
          deadline: deadline.clone().add(2, 'days'),
          index: 3,
          isDone: false,
          _id: '3',
          _rev: undefined
        },
        {
          title: 'task2',
          details: undefined,
          deadline: deadline.clone().add(1, 'day'),
          index: 2,
          isDone: false,
          _id: '2',
          _rev: undefined
        }
      ]
    );

    const expected: Task[] = [
      {
        title: 'task2',
        details: undefined,
        deadline: deadline.clone().add(1, 'day'),
        index: 2,
        isDone: false,
        _id: '2',
        _rev: undefined
      },
      {
        title: 'task3',
        details: undefined,
        deadline: deadline.clone().add(2, 'days'),
        index: 3,
        isDone: false,
        _id: '3',
        _rev: undefined
      }
    ];

    expect(result.length).toBe(expected.length);
    expect(result[0]).toEqual(expected[0]);
    expect(result[1]).toEqual(expected[1]);
  });

  it('should return relevant tasks', () => {
    const deadline = moment();
    const result: Task[] = TaskSelectors.selectRelevantTasks(false).projector(
      [
        {
          title: 'task1',
          details: undefined,
          deadline: undefined,
          index: 1,
          isDone: false,
          _id: '1',
          _rev: undefined
        }
      ],
      [
        {
          title: 'task3',
          details: undefined,
          deadline: deadline.clone().add(3, 'days'),
          index: 3,
          isDone: false,
          _id: '3',
          _rev: undefined
        },
        {
          title: 'task2',
          details: undefined,
          deadline: deadline.clone().add(1, 'day'),
          index: 2,
          isDone: false,
          _id: '2',
          _rev: undefined
        }
      ]
    );

    const expected: Task[] = [
      {
        title: 'task1',
        details: undefined,
        deadline: undefined,
        index: 1,
        isDone: false,
        _id: '1',
        _rev: undefined
      },
      {
        title: 'task3',
        details: undefined,
        deadline: deadline.clone().add(3, 'days'),
        index: 3,
        isDone: false,
        _id: '3',
        _rev: undefined
      },
      {
        title: 'task2',
        details: undefined,
        deadline: deadline.clone().add(1, 'day'),
        index: 2,
        isDone: false,
        _id: '2',
        _rev: undefined
      }
    ];

    expect(result.length).toBe(expected.length);
    expect(result[0]).toEqual(expected[0]);
    expect(result[1]).toEqual(expected[1]);
    expect(result[2]).toEqual(expected[2]);
  });

  it('should return only tasks with a given substring', () => {
    const deadline = moment();
    const result: Task[] = TaskSelectors.selectTasksByName('test').projector(
      [
        {
          title: 'test1',
          details: undefined,
          deadline: undefined,
          index: 1,
          isDone: false,
          _id: '1',
          _rev: undefined
        },
        {
          title: 'task3',
          details: undefined,
          deadline: deadline.clone().add(3, 'days'),
          index: 3,
          isDone: false,
          _id: '3',
          _rev: undefined
        },
        {
          title: 'test2',
          details: undefined,
          deadline: deadline.clone().add(1, 'day'),
          index: 2,
          isDone: false,
          _id: '2',
          _rev: undefined
        }
      ]
    );

    const expected: Task[] = [
      {
        title: 'test1',
        details: undefined,
        deadline: undefined,
        index: 1,
        isDone: false,
        _id: '1',
        _rev: undefined
      },
      {
        title: 'test2',
        details: undefined,
        deadline: deadline.clone().add(1, 'day'),
        index: 2,
        isDone: false,
        _id: '2',
        _rev: undefined
      }
    ];

    expect(result.length).toBe(expected.length);
    expect(result[0]).toEqual(expected[0]);
    expect(result[1]).toEqual(expected[1]);
  });
});
