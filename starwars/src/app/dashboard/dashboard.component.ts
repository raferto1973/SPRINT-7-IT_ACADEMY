// dashboard.component.ts

import { Component } from '@angular/core';
import { FooterComponent } from '@shared/footer/footer.component';
import { HeaderComponent } from '@shared/header/header.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import StarshipsComponent from './pages/starships/starships.component';
import { RouterOutlet } from '@angular/router';





@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [NavbarComponent, HeaderComponent, FooterComponent, StarshipsComponent, RouterOutlet]

})

// Componente de la página de inicio
export default class DashboardComponent {

}
