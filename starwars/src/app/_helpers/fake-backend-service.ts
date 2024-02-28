

// fake-backend.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



// Aquest interceptor simula el backend de l'aplicació.
export class FakeBackendService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`).pipe(
      catchError(error => throwError('Error fetching users'))
    );
  }

  addUser(user: any): Observable<any> {
    return this.getUsers().pipe(
      switchMap(users => {
        if (users.some((x: any) => x.email === user.email)) {
          return throwError(() => new Error('Email "' + user.email + '" is already taken'));
        }
        const newUser = { ...user, id: users.length + 1, token: 'fake-jwt-token' };
        return this.http.post(`${this.apiUrl}/users`, newUser);
      })
    );
  }


  authenticate(email: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find((x: any) => x.email === email && x.password === password);
        if (!user) {
          throw new Error('Credencials incorrectes');
        }
        return { ...user, token: 'fake-jwt-token' };
      }),
      catchError(() => throwError('Error al obtenir usuaris'))
    );
  }

  logout(): Observable<any> {
    // Implementa la lógica de cierre de sesión aquí
    // Retorna un observable vacío ya que no hay una acción real en el backend falso
    return new Observable(observer => {
      observer.complete();
    });
  }
}
