import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPage],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        SharedModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
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
