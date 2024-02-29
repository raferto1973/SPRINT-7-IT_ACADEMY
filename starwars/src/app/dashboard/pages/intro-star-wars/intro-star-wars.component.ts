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


  // Sets the number of stars we wish to display
  const numStars: number = 100;

  // For every star we want to display
  for (let i: number = 0; i < numStars; i++) {

    let star = document.createElement("div");
    star.className = "star";
    var xy = getRandomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    document.body.append(star);
  }


  // Gets random x, y values based on the size of the container
  function getRandomPosition() {

    var y = window.innerWidth;
    var x = window.innerHeight;
      var randomX = Math.floor(Math.random()*x);
      var randomY = Math.floor(Math.random()*y);
      return [randomX,randomY];
  }

