import { Component, Injector } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as moment from 'moment';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { RootStoreState, TaskActions } from './root-store';
import { AuthService } from './services/auth.service';

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
    private translate: TranslateService,
    private store$: Store<RootStoreState.State>,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.initLocale();
      this.authService.checkSession();
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
