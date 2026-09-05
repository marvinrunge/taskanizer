import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { TaskStore } from './task-store.service';
import { firebaseAuth } from '../firebase';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public router: Router,
    private snackBar: MatSnackBar,
    private taskStore: TaskStore
  ) {}

  async checkSession(): Promise<void> {
    await firebaseAuth.authStateReady();
    if (firebaseAuth.currentUser) {
      this.taskStore.load();
      await this.router.navigate(['app/tabs/overview']);
    }
  }

  async register(loginData: LoginData): Promise<void> {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, loginData.email, loginData.password);
      await this.finishLogin();
    } catch (error) {
      this.snackBar.open(this.authError(error));
    }
  }

  async login(loginData: LoginData): Promise<void> {
    try {
      await signInWithEmailAndPassword(firebaseAuth, loginData.email, loginData.password);
      await this.finishLogin();
    } catch (error) {
      this.snackBar.open(this.authError(error));
    }
  }

  async logOut(): Promise<void> {
    await signOut(firebaseAuth);
    this.taskStore.reset();
    await this.router.navigate(['/']);
  }

  private async finishLogin(): Promise<void> {
    this.taskStore.load();
    await this.router.navigate(['app/tabs/overview']);
  }

  private authError(error: unknown): string {
    const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
    if (code.includes('invalid-credential')) {
      return 'Email or password incorrect';
    }
    if (code.includes('email-already-in-use')) {
      return 'This email address is already registered';
    }
    if (code.includes('invalid-email')) {
      return 'Invalid email address';
    }
    return 'Authentication failed';
  }
}
