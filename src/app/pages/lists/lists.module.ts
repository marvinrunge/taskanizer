import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListsPage } from './lists.page';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: ListsPage }])
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
