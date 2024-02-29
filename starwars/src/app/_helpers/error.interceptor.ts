

// error.interceptor.ts

// Aquest interceptor captura totes les respostes HTTP amb un estat d'error i comprova si la resposta és 401 o 403. Si és així, l'usuari es desconnecta automàticament. Si la resposta és un altre tipus d'error, es retorna l'error de resposta com a missatge d'error.



import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../_services';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {

      if ([401, 403].includes(err.status) && this.accountService.userValue) {
        // auto logout if 401 or 403 response returned from api
        this.accountService.logout();
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);

    }))
  }
}
