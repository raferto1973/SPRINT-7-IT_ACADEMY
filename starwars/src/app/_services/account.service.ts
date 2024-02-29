

// account.service.ts

// Aquest servei gestiona l'autenticació i el registre d'usuaris. Utilitza el servei fakeBackendService per autenticar usuaris i registrar-ne de nous. També emmagatzema l'usuari actual a la memòria cau local i proporciona un mètode per desconnectar-se.


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

  // Aquest constructor inicialitza el subject de l'usuari amb l'usuari emmagatzemat a la memòria cau local, si n'hi ha un.
  constructor(
    private router: Router,
    private fakeBackendService: FakeBackendService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  // Aquest getter permet obtenir l'usuari actual sense subscriure's al subject.
  public get userValue() {
    return this.userSubject.value;
  }

  // Aquest mètode autentica l'usuari i emmagatzema l'usuari a la memòria cau local.
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

  // Aquest mètode desconnecta l'usuari i elimina l'usuari de la memòria cau local.
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Aquest mètode registra un nou usuari i, si s'ha registrat correctament, autentica l'usuari.
  register(user: User) {
    if (user.email && user.password) {
      return this.fakeBackendService.addUser(user).pipe(
        switchMap(() => this.login(user.email!, user.password!)) // autenticar l'usuari
      );
    } else {
      // Manejar l'error: email o password no proporcionats
      return throwError(() => new Error('Email i password són requerits.'));
    }
  }


}
