

// fake-backend.service.ts

// Aquest servei simula un backend real, però en realitat només emmagatzema les dades a la memòria del navegador. Això és útil per a la fase de desenvolupament, ja que no necessites un servidor real per a provar la teva aplicació.


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})


export class FakeBackendService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Aquest mètode genera un token JWT simulat per a l'usuari proporcionat.
  private generateFakeToken(user: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      })
    );
    const signature = 'simulated_signature';
    const token = `${header}.${payload}.${signature}`;
    console.log("Token generat per a l'usuari:", token);
    return token;
  }

  // Aquest mètode retorna tots els usuaris emmagatzemats al backend simulat.
  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Error fetching users'));
      })
    );
  }

  // Aquest mètode afegeix un nou usuari al backend simulat.
  addUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/users`;

    return this.getUsers().pipe(
      take(1),
      switchMap((users) => {
        if (users.find((x: any) => x.email === user.email)) {
          console.error(
            "Intent d'afegir un usuari amb un correu electrònic ja existent:",
            user.email
          );
          // En FakeBackendService, quan llances un error:
          return throwError(
            () =>
              new Error(
                JSON.stringify({
                  error: {
                    message: 'Email "' + user.email + '" is already taken',
                  },
                })
              )
          );
        }

        const newUser = { ...user, token: this.generateFakeToken(user) };
        console.log('Usuari afegit amb èxit:', newUser);
        return this.http.post(url, newUser);
      }),
      catchError((error) => {
        console.error('Error adding user:', error);
        return throwError(() => new Error('Error adding user'));
      })
    );
  }

  // Aquest mètode autentica un usuari amb un correu electrònic i una contrasenya.
  authenticate(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users`;

    return this.getUsers().pipe(
      map((users: any[]) => {
        const authenticatedUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!authenticatedUser) {
          console.error("Error d'autenticació per a:", email);
          throw new Error('Credenciales incorrectas');
        }

        const token = this.generateFakeToken(authenticatedUser);
        console.log('Usuari autenticat amb èxit, token:', token);
        return { ...authenticatedUser, token: token };
      }),
      catchError(() => throwError(() => new Error('Error al obtener usuarios')))
    );
  }

  // Aquest mètode desconnecta l'usuari.
  logout(): Observable<any> {
    console.log('Usuari desconnectat');
    return new Observable((observer) => {
      observer.complete();
    });
  }
}
