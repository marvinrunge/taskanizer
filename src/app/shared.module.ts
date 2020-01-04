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
  ],
  exports: [
    TaskListitemComponent,
    TaskCreateComponent,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class SharedModule { }
