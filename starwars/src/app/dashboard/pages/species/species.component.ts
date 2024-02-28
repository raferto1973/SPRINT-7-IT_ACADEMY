

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // RouterOutlet no es necesario importarlo aquí

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Specie } from '@interfaces/specie.interface'; // Asegúrate de que la ruta sea correcta

import { SpeciesService } from '@services/species.service'; // Asegúrate de que la ruta sea correcta


@Component({
  selector: 'app-species',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule], // Solo importa módulos aquí
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'] // 'styleUrls' en lugar de 'styleUrl'
})

export default class SpeciesComponent implements OnInit {

  // Atributos
  species: Specie[] = []; // Array de especies
  page: number = 1; // Página para obtener las especies
  loadMore: boolean = true; // Indica si se pueden cargar más especies

  constructor(private speciesService: SpeciesService, private router: Router) {} // Corregido nombre de la variable para seguir convenciones y corregido el tipo

  // Método para inicializar el componente
  ngOnInit(): void {
    this.getSpecies();
  }

  // Método para obtener las especies
  public getSpecies() {
    this.speciesService.getSpeciesService(this.page) // Asegúrate de que el método se llame `getSpecies` en el servicio
      .subscribe({
        next: (data: { results: any; }) => {
          this.species = [...this.species, ...data.results];
          this.species.forEach(specie => {
            const segments = specie.url.split('/');
            const id = segments[segments.length - 2];
            specie.id = id; // Asegúrate de que el modelo `Specie` tenga una propiedad `id`
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
    return `https://starwars-visualguide.com/#/species/${id}.jpg`; // Asegúrate de que la ruta sea correcta
  }

  // Método para cargar más especies
  public loadMoreSpecies(): void {
    if (this.loadMore) {
      this.page++;
      this.getSpecies();
    }
  }

}
