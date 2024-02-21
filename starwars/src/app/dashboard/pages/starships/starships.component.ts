
// starships.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Starship } from '@interfaces/starship.interface';

import { StarwarsService } from '@services/starwars.service';


@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule, RouterOutlet ],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss',
})


export default class StarshipsComponent implements OnInit {

  // Atributs
  public starships: Starship[]  = [];         // Array de naus
  private page: number          = 1;          // Pàgina per obtenir les naus
  public loadMore: boolean      = true;       // Variable per controlar si es poden carregar més naus

  // Constructor amb una instància del servei de Starwars i del router
  constructor(private starwarsService: StarwarsService, private router: Router) {}

  // Mètode per inicialitzar el component
  ngOnInit(): void {
    this.getStarships();
  }

  // Mètode per obtenir les naus
  public getStarships() {
    this.starwarsService.getStarships(this.page)
        .subscribe({
          next: (data) => {
            this.starships = this.starships.concat(data.results);
            this.starships.forEach(ship => {
              ship.id = ship.url.split('/').reverse()[1];
            });
          },
          error: (error) => {
            //should not load more Starships
            if (error.status === 404) this.loadMore = false;
          }
        });
  }

  // Mètode per carregar més naus
  public loadMoreStarships() {
    if (this.loadMore) {
      this.page++;
      this.getStarships();
    }
  }

  // Mètode per veure el detall d'una nau
  public viewShip(id: string) {
    this.router.navigate(['/dasboard/starships', id]);
    console.log(id);
  }
}
