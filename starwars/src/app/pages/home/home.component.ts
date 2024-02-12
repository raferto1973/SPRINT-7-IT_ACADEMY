// home.component.ts

import { Component } from '@angular/core';

import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import StarshipsListComponent from '../../components/starships-list/starships-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NavbarComponent, HeaderComponent, FooterComponent, StarshipsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

// Componente de la página de inicio
export class HomeComponent {

}
