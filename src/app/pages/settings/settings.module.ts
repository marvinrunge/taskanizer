import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: SettingsPage }])
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
