// dashboard.component.ts

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


import { HeaderComponent } from '@shared/header/header.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { FooterComponent } from '@shared/footer/footer.component';

import StarshipsComponent from './pages/starships/starships.component';

import { StarshipComponent } from './pages/starship/starship.component';
import { PilotsComponent } from './pages/pilots/pilots.component';
import { FilmsComponent } from './pages/films/films.component';





@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [RouterModule, NavbarComponent, HeaderComponent, FooterComponent, StarshipsComponent, RouterOutlet, StarshipComponent, PilotsComponent, FilmsComponent ],

})


// Component de la pàgina principal de l'aplicació
export default class DashboardComponent {

}
