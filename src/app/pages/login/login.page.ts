import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public router: Router,
    public http: HttpClient,
    public authService: AuthService) {

  }

  login() {
    this.authService.login({ name: this.username, password: this.password });
  }

  launchRegister() {
    this.router.navigate(['register']);
  }
}
