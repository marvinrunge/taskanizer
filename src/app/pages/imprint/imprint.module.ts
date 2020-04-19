import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ImprintPage } from './imprint.page';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: ImprintPage }])
  ],
  declarations: [ImprintPage]
})
export class ImprintPageModule {}
