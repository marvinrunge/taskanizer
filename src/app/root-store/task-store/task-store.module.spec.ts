import { TaskStoreModule } from './task-store.module';

describe('TaskStoreModule', () => {
  let taskStoreModule: TaskStoreModule;

  beforeEach(() => {
    taskStoreModule = new TaskStoreModule();
  });

  it('should create an instance', () => {
    expect(taskStoreModule).toBeTruthy();
  });
});
