import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationsPage } from './notifications.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';

describe('NotificationsPage', () => {
  let component: NotificationsPage;
  let fixture: ComponentFixture<NotificationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsPage],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        SharedModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
