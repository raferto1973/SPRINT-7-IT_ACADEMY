// fake-backend.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }

  addUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/users`;

    // Verificar si el usuario ya existe
    return this.getUsers().pipe(
      take(1),
      switchMap((users) => {
        if (users.find((x: any) => x.username === user.username)) {
          return throwError('Username "' + user.username + '" is already taken');
        }

        // Si el usuario no existe, realizar la inserción
        return this.http.post(url, user);
      })
    );
  }


  authenticate(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users`;

    // Verificar las credenciales en db.json
    return this.getUsers().pipe(
      delay(500),  // Simula el tiempo de espera del servidor
      catchError(() => throwError('Error al obtener usuarios')),
      map((users: any[]) => {
        const authenticatedUser = users.find(u => u.username === username && u.password === password);

        if (!authenticatedUser) {
          throw new Error('Credenciales incorrectas');
        }

        const fakeToken = 'fake-jwt-token';
        return { token: fakeToken };
      })
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
