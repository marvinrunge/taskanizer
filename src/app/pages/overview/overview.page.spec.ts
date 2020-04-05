import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPage } from './overview.page';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RootStoreModule, TaskStoreModule } from 'src/app/root-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';

describe('OverviewPage', () => {
  let component: OverviewPage;
  let fixture: ComponentFixture<OverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewPage],
      imports: [
        TranslateModule.forRoot(),
        SharedModule,
        TaskStoreModule,
        RootStoreModule,
        EffectsModule.forRoot([]),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewPage);
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
