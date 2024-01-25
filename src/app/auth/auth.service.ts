import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();
  constructor(private router: Router) {}

  signUp(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully();
  }
  logout() {
    console.log('logging out');

    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.user != null;
  }
  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
