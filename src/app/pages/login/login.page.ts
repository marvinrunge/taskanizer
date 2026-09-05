import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;

  constructor(
    public router: Router,
    public http: HttpClient,
    public authService: AuthService) {

  }

  login() {
    this.authService.login({ email: this.email, password: this.password });
  }

  launchRegister() {
    this.router.navigate(['register']);
  }

  navigateToPrivayPolicy() {
    this.router.navigate(['privacy-policy']);
  }

  navigateToImprint() {
    this.router.navigate(['imprint']);
  }
}
