import { taskReducer } from './reducer';
import { TaskState, initialTaskState } from './state';

describe('TaskReducer', () => {
  it('should return the default state', () => {
    const action: any = {};
    const result: TaskState = taskReducer(undefined, action);
    expect(result).toEqual(initialTaskState);
  });
});
