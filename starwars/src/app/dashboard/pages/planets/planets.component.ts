import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Planet } from '@interfaces/planet.interface';

import { PlanetsService } from '@services/planets.service';


type Pilot = {
  id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule], // Solo importa módulos aquí
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss'
})




export default class PlanetsComponent implements OnInit {

  // Atributos
  planets: Planet[] = [];         // Array de planetes
  page: number = 1;               // Página para obtener las especies
  loadMore: boolean = true;       // Indica si se pueden cargar más especies

  constructor(private planetsService: PlanetsService, private router: Router) {}

  // Método para inicializar el componente
  ngOnInit(): void {
    this.getPlanets();
  }

  // Métode per obtenir planetes
  public getPlanets() {
    this.planetsService.getPlanetsService(this.page)
      .subscribe({
        next: (data: { results: any; }) => {
          this.planets = [...this.planets, ...data.results];
          this.planets.forEach(planet => {
            const segments = planet.url.split('/');
            const id = segments[segments.length - 2];
            planet.id = id; // Asegúrate de que el modelo `Specie` tenga una propiedad `id`
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


  // Método para generar la URL de la imagen de una especie
  public generateImageUrl(id: string): string {
    return `https://starwars-visualguide.com/#/planets/${id}.jpg`; // Asegúrate de que la ruta sea correcta
  }

  // Método para cargar más especies
  public loadMorePlanets(): void {
    if (this.loadMore) {
      this.page++;
      this.getPlanets();
    }
  }

}

