import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskPage } from './edit-task.page';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskStoreModule, RootStoreModule } from 'src/app/root-store';
import { EffectsModule } from '@ngrx/effects';

describe('EditTaskPage', () => {
  let component: EditTaskPage;
  let fixture: ComponentFixture<EditTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskPage],
      imports: [
        SharedModule,
        MaterialModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        TaskStoreModule,
        RootStoreModule,
        EffectsModule.forRoot([]),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
