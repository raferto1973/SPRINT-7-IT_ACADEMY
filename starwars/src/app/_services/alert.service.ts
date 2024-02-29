

// alert.service.ts

// Aquest servei gestiona els missatges d'alerta. Els components poden subscriure's a aquest servei per rebre notificacions quan es mostri un missatge d'alerta. Els components també poden cridar mètodes d'aquest servei per mostrar missatges d'alerta.

import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })


export class AlertService {
  private subject = new Subject<any>();
  private showAfterRedirect = false;

  // Aquest constructor neteja els missatges d'alerta en canviar de ruta a menys que el missatge hagi de mostrar-se després de redirigir.
  constructor(private router: Router) {
    // clear alert messages on route change unless 'showAfterRedirect' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.showAfterRedirect) {
          // only keep for a single route change
          this.showAfterRedirect = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  // Aquest mètode permet als components subscriure's a aquest servei per rebre notificacions quan es mostri un missatge d'alerta.
  onAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  // Aquest mètode mostra un missatge d'alerta de tipus 'success'.
  success(message: string, showAfterRedirect = false) {
    this.showAfterRedirect = showAfterRedirect;
    this.subject.next({ type: 'success', message });
  }

  // Aquest mètode mostra un missatge d'alerta de tipus 'error'.
  error(message: string, showAfterRedirect = false) {
    this.showAfterRedirect = showAfterRedirect;
    this.subject.next({ type: 'error', message });
  }

  // Aquest mètode neteja els missatges d'alerta.
  clear() {
    this.subject.next(null);
  }
}
