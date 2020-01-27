import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditTaskPage } from './edit-task.page';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: EditTaskPage }])
  ],
  declarations: [EditTaskPage]
})
export class EditTaskPageModule {}
