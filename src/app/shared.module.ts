import { NgModule } from '@angular/core';
import { TaskListitemComponent } from './components/task-listitem/task-listitem.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    TaskListitemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterialModule
  ],
  exports: [
    TaskListitemComponent,
    TranslateModule,
  ]
})
export class SharedModule { }
