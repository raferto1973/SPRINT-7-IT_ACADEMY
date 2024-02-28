

// fake-backend.ts

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize, take, tap, switchMap, catchError } from 'rxjs/operators';
import { FakeBackendService } from './fake-backend-service';

// array in local storage for registered users
const usersKey = 'angular-tutorial-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()

// Aquest interceptor simula el backend de l'aplicació.
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(private prueba: FakeBackendService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    const register = (): Observable<HttpEvent<any>> => { // <--- Agregar el tipo de retorno
      const user = body;

      return this.prueba.getUsers().pipe(
        take(1),
        tap((backendUsers) => {
          console.log('Backend Users:', backendUsers);
        }),
        switchMap((backendUsers) => {
          // Verificar si el nombre de usuario ya existe en el backend
          if (backendUsers.find((x: any) => x.email === user.email)) {
            return error('Email "' + user.email + '" is already taken');
          }

          // Si el nombre de usuario no existe en el backend, continuar con el registro
          user.id = users.length ? Math.max(...users.map((x: any) => x.id)) + 1 : 1;
          users.push(user);
          localStorage.setItem(usersKey, JSON.stringify(users));

          // Guardar el nuevo usuario en db.json
          return this.prueba.addUser(user).pipe(
            switchMap(() => ok())
          );
        }),
        catchError((error) => {
          console.error('Error in register:', error);
          return throwError(error);
        })
      );
    };


    console.log(this.prueba);
    return handleRoute();

    function handleRoute(): Observable<HttpEvent<any>> {

      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }


    // route functions

    function authenticate() {

      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) return error('Email or password is incorrect');
      return ok({
        ...basicDetails(user),
        token: 'fake-jwt-token'
      })
    }




    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: string) {
      return throwError(() => ({ error: { message } }))
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function basicDetails(user: any) {
      const { id, email, firstName, lastName } = user;
      return { id, email, firstName, lastName };
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
