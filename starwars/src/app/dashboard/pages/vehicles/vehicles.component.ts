
// vehicle.component.ts

// Aquest component mostra les naus de Star Wars. Aquestes naus es mostren en una llista infinita. Els usuaris poden navegar a la pàgina de detall de cada nau fent clic a la nau.



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // RouterOutlet no es necesario importarlo aquí

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Vehicle } from '@interfaces/vehicle.interface';
import { VehiclesService } from '@services/vehicles.service';


@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule], // Solo importa módulos aquí
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})


export default class SpeciesComponent implements OnInit {

  // Aquesta propietat emmagatzema les naus
  vehicles: Vehicle[] = [];
  // Aquesta propietat emmagatzema el número de pàgina per obtenir les naus
  page: number = 1;
  // Aquesta propietat indica si es poden carregar més naus
  loadMore: boolean = true;


  // Aquest constructor injecta el servei de naus i el router
  constructor(private vehicleService: VehiclesService, private router: Router) {}


  // Aquest mètode s'executa quan es crea el component
  ngOnInit(): void {
    this.getVehicle();
  }

  // Mètode per obtenir les naus
  public getVehicle() {
    this.vehicleService.getVehiclesService(this.page)
      .subscribe({
        next: (data: { results: any; }) => {
          this.vehicles = [...this.vehicles, ...data.results];
          this.vehicles.forEach(vehicle => {
            const segments = vehicle.url.split('/');
            const id = segments[segments.length - 2];
            vehicle.id = id;
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


  // Mètode per generar la URL de la imatge de la nau
  public generateImageUrl(id: string): string {
    return `https://starwars-visualguide.com/#/vehicle/${id}.jpg`;
  }


  // Mètode per carregar més naus
  public loadMoreVehicle(): void {
    if (this.loadMore) {
      this.page++;
      this.getVehicle();
    }
  }
}

