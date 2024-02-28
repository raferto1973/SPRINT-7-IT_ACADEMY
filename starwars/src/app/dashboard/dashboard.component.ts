// dashboard.component.ts

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

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.userSubscription = this.accountService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
