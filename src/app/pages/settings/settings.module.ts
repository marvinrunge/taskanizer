import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsPage } from './settings.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: SettingsPage }])
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
