import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsPage } from './lists.page';
import { SharedModule } from 'src/app/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskStoreModule, RootStoreModule } from 'src/app/root-store';
import { EffectsModule } from '@ngrx/effects';

describe('ListsPage', () => {
  let component: ListsPage;
  let fixture: ComponentFixture<ListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListsPage],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        SharedModule,
        NoopAnimationsModule,
        TaskStoreModule,
        RootStoreModule,
        EffectsModule.forRoot([]),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListsPage);
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
