import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import DashboardComponent from './dashboard/dashboard.component';
import StarshipsComponent from './dashboard/pages/starships/starships.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, StarshipsComponent, DashboardComponent]
})
export class AppComponent {
  title = 'starwars';
}
