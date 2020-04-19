import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PrivacyPolicyPage } from './privacy-policy.page';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: PrivacyPolicyPage }])
  ],
  declarations: [PrivacyPolicyPage]
})
export class PrivacyPolicyPageModule {}
