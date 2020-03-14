import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, TaskActions } from 'src/app/root-store';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(
    private store$: Store<RootStoreState.State>,
    private authService: AuthService
    ) {}

  logOut() {
    this.authService.logOut();
  }
}
