// home.component.ts

import { Component } from '@angular/core';


import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { StarshipsComponent } from "../starships/starships.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NavbarComponent, HeaderComponent, FooterComponent, StarshipsComponent]
})

// Componente de la página de inicio
export class HomeComponent {

}
