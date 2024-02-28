import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-intro-star-wars',
  standalone: true,
  imports: [ CommonModule, RouterModule, RouterOutlet,  ],
  templateUrl: './intro-star-wars.component.html',
  styleUrl: './intro-star-wars.component.css'
})
export default class IntroStarWarsComponent {

}
