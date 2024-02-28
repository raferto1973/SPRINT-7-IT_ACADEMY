import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet,  } from '@angular/router';
import StarshipsComponent from './dashboard/pages/starships/starships.component';
import { HomeComponent } from './dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, StarshipsComponent, HomeComponent, RouterModule ]
})
export class AppComponent {
  title = 'starwars';
}
