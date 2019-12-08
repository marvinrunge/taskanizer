import { NgModule } from '@angular/core';
import { TaskListitemComponent } from './components/task-listitem/task-listitem.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    TaskListitemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule
  ],
  exports: [
    TaskListitemComponent
  ]
})
export class SharedModule { }
