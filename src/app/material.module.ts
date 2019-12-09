import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule { }
