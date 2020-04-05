import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';
import { TaskStoreModule, RootStoreModule } from 'src/app/root-store';
import { EffectsModule } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared.module';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        TranslateModule.forRoot(),
        TaskStoreModule,
        RootStoreModule,
        SharedModule,
        NoopAnimationsModule,
        EffectsModule.forRoot([]),
        RouterTestingModule
      ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
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
