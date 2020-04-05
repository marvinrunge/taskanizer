import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPage } from './register.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        SharedModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
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
