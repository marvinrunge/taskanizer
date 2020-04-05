import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TaskService = TestBed.inject(TaskService);
    expect(service).toBeTruthy();
  });
});
