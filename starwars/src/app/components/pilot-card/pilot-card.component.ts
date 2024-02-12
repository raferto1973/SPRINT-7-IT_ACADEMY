import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pilot-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilot-card.component.html',
  styleUrl: './pilot-card.component.scss'
})
export class PilotCardComponent {
  @Input() pilotImages: string[] = [];
}
