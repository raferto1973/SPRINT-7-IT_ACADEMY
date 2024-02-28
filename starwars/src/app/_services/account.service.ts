

// account.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { FakeBackendService } from './../_helpers/fake-backend-service';
import { User } from './../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private fakeBackendService: FakeBackendService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.fakeBackendService.authenticate(email, password)
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }


  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    if (user.email && user.password) {
      return this.fakeBackendService.addUser(user).pipe(
        switchMap(() => this.login(user.email!, user.password!)) // Add the non-null assertion operator (!) to ensure that the values are not undefined
      );
    } else {
      // Manejar l'error: email o password no proporcionats
      return throwError(() => new Error('Email i password són requerits.'));
    }
  }


}
