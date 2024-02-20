import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export default class PilotsComponent {

}
