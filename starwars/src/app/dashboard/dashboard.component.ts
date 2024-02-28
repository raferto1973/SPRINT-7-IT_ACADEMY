// dashboard.component.ts

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';



import { NavbarComponent } from '@shared/navbar/navbar.component';
import { FooterComponent } from '@shared/footer/footer.component';

import StarshipsComponent from './pages/starships/starships.component';
import { WelcomeComponent } from '@shared/welcome/welcome.component';
import { HeaderComponent } from '@shared/header/header.component';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [ CommonModule ,RouterModule, RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent, WelcomeComponent, StarshipsComponent, ],

})


// Component de la pàgina principal de l'aplicació
export default class DashboardComponent {
isLoggedIn: any;



}
