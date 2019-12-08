import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TaskStoreEffects } from './effects';
import { taskreducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', taskreducer),
    EffectsModule.forFeature([TaskStoreEffects])
  ],
  providers: [TaskStoreEffects]
})
export class TaskStoreModule { }
