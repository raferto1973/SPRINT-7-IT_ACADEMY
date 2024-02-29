

// dashboard.component.ts


// Aquest component és la pàgina principal de l'aplicació. Aquest component mostra la barra de navegació, el capçalera i el peu de pàgina. A més, aquest component mostra la pàgina de benvinguda i les naus de Star Wars.


import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, RouterOutlet } from '@angular/router';

import { AccountService } from '../_services';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '@shared/header/header.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { FooterComponent } from '@shared/footer/footer.component';

import { WelcomeComponent } from '@shared/welcome/welcome.component';

import StarshipsComponent from './pages/starships/starships.component';



@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [ CommonModule ,RouterModule, RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent, WelcomeComponent, StarshipsComponent, ],

})


// Component de la pàgina principal de l'aplicació
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;

  // Aquest constructor injecta el servei d'autenticació
  constructor(private accountService: AccountService) {}

  // Aquest mètode s'executa quan es crea el component
  ngOnInit(): void {
    this.userSubscription = this.accountService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  // Aquest mètode s'executa quan es destrueix el component
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
