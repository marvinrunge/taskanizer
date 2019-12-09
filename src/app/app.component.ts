import { Component, Injector } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as moment from 'moment';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private injector: Injector,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.initLocale();
      this.splashScreen.hide();
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
