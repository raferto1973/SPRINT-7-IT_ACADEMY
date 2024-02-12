// film-card.component.ts

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss'
})
export class FilmCardComponent implements OnInit {
  @Input() filmImages: string[] = [];


  ngOnInit(): void {
    // console.log(this.filmImages);
  }


}
