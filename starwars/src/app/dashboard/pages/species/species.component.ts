
// species.component.ts


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Specie } from '@interfaces/specie.interface';

import { SpeciesService } from '@services/species.service';


@Component({
  selector: 'app-species',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})

export default class SpeciesComponent implements OnInit {

  // Aquesta propietat emmagatzema les especies
  species: Specie[] = [];
  // Aquesta propietat emmagatzema el número de pàgina per obtenir les especies
  page: number = 1;
  // Aquesta propietat indica si es poden carregar més especies
  loadMore: boolean = true;

  // Aquest constructor injecta el servei de les especies i el router
  constructor(private speciesService: SpeciesService, private router: Router) {}

  // Aquest mètode s'executa quan es crea el component
  ngOnInit(): void {
    this.getSpecies();
  }

  // Aquest mètode obté les especies
  public getSpecies() {
    this.speciesService.getSpeciesService(this.page)
      .subscribe({
        next: (data: { results: any; }) => {
          this.species = [...this.species, ...data.results];
          this.species.forEach(specie => {
            const segments = specie.url.split('/');
            const id = segments[segments.length - 2];
            specie.id = id;
          });
        },
        error: (error: { status: number; }) => {
          if (error.status === 404) this.loadMore = false;
        }
      });
  }


  // Mètode per gestionar errors en la càrrega de les imatges
  public handleImageError(event: any) {
    event.target.src = '../../assets/placeholder/placeholder.jpg';
  }


  // Mètode per generar la URL de la imatge
  public generateImageUrl(id: string): string {
    return `https://starwars-visualguide.com/#/species/${id}.jpg`; // Asegúrate de que la ruta sea correcta
  }

  // Mètode per carregar més especies
  public loadMoreSpecies(): void {
    if (this.loadMore) {
      this.page++;
      this.getSpecies();
    }
  }

}
