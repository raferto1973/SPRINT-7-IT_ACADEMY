import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './films.component.html',
})
export default class FilmsComponent {

}
