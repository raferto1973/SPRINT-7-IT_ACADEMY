// account.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

  login(username: string, password: string) {
    return this.fakeBackendService.authenticate(username, password)
      .pipe(
        switchMap(response => {
          const user = { username, token: response.token };  // Ajusta según tus datos de usuario
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return this.fakeBackendService.getUsers();  // Puedes obtener más detalles del usuario si es necesario
        }),
        map(users => users.find((user: any) => user.username === username))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.fakeBackendService.addUser(user);
  }
}
