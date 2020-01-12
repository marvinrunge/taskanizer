import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsPage } from './notifications.page';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: NotificationsPage }])
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule {}
