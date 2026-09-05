import { Component, Injector } from '@angular/core';

import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private injector: Injector,
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.initLocale();
      this.authService.checkSession();
    });
  }

  private initLocale() {
    const locationInitialized = this.injector.get(LOCATION_INITIALIZED, Promise.resolve(undefined));
    locationInitialized.then(() => {
      const browserLanguage = this.translate.getBrowserLang();
      this.translate.setDefaultLang('en');
      moment.locale(browserLanguage);
      this.translate.use(browserLanguage);
    });
  }
}
