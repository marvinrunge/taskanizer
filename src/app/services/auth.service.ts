import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from './task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RootStoreState, TaskActions } from '../root-store';
import { Store } from '@ngrx/store';

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
  constructor(public router: Router, private taskService: TaskService,
              private snackBar: MatSnackBar, private store$: Store<RootStoreState.State>) {

  }

  checkSession() {
    if (localStorage.getItem('current-user')) {
      this.taskService.initDb();
      this.taskService.getDb().getSession((err, response) => {
        if (err) {
          this.snackBar.open('Network error');
        } else if (!response.userCtx.name) {
          // nobody's logged in
        } else {
          this.store$.dispatch(TaskActions.loadRequest());
          this.router.navigate(['app/tabs/overview']);
        }
      });
    }
  }

  public register(loginData: LoginData) {
    localStorage.setItem('current-user', loginData.name);
    this.taskService.initDb();
    this.taskService.getDb().signUp(loginData.name, loginData.password, (err) => {
      if (err) {
        if (err.name === 'conflict') {
          this.snackBar.open(loginData.name + ' already exists, choose another username');
        } else if (err.name === 'forbidden') {
          this.snackBar.open('Invalid username');
        } else {
          this.snackBar.open('You are offline');
        }
      } else {
        this.login(loginData);
      }
    });
  }

  public login(loginData: LoginData) {
    localStorage.setItem('current-user', loginData.name);

    if (!this.taskService.getDb()) {
      this.taskService.initDb();
    }

    this.taskService.getDb().logIn(loginData.name, loginData.password, (err) => {
      if (err) {
        if (err.name === 'unauthorized' || err.name === 'forbidden') {
          this.snackBar.open('Name or password incorrect');
        } else {
          this.snackBar.open('Network error');
        }
      } else {
        this.checkSession();
      }
    });
  }

  public logOut() {
    this.taskService.getDb().logOut((err) => {
      if (err) {
        this.snackBar.open('You are offline');
      } else {
        this.taskService.reset();
        localStorage.removeItem('current-user');
        window.location.href = '/';
      }
    });
  }
}
