import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatCardModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    DragDropModule
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    DragDropModule
  ]
})
export class MaterialModule { }
