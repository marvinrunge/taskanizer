import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  logOut() {
    this.authService.logOut();
  }

  navigateToPrivayPolicy() {
    this.router.navigate(['privacy-policy']);
  }

  navigateToImprint() {
    this.router.navigate(['imprint']);
  }
}
