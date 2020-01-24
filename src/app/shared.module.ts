import { NgModule } from '@angular/core';
import { TaskListitemComponent } from './components/task-listitem/task-listitem.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TaskCreateComponent } from './components/create-task/create-task.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [
    TaskListitemComponent,
    TaskCreateComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    AmazingTimePickerModule
  ],
  exports: [
    TaskListitemComponent,
    TaskCreateComponent,
    TaskListComponent,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
