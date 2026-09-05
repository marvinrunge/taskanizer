import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverviewPage } from './overview.page';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('OverviewPage', () => {
  let component: OverviewPage;
  let fixture: ComponentFixture<OverviewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewPage],
      imports: [
        TranslateModule.forRoot(),
        IonicModule.forRoot(),
        SharedModule,
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
