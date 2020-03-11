import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TaskService } from './task.service';
import { environment } from 'src/environments/environment';

export interface LoginData {
  name: string;
  password: string;
}

export class RegistrationData {
  constructor(loginData: LoginData) {
    this.name = loginData.name;
    this.password = loginData.password;
    this.roles = [];
    this.type = 'user';
  }

  name: string;
  password: string;
  roles: string[];
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public router: Router) {

  }

  public register(loginData: LoginData) {
    const registrationData = new RegistrationData(loginData);
    this.login({ name: registrationData.name, password: registrationData.password });
  }

  public login(loginData: LoginData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    this.router.navigateByUrl('app/tabs/overview');
  }
}
