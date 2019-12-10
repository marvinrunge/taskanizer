import { NgModule } from '@angular/core';
import { TaskListitemComponent } from './components/task-listitem/task-listitem.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TaskCreateComponent } from './components/create-task/create-task.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    TaskListitemComponent,
    TaskCreateComponent
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
