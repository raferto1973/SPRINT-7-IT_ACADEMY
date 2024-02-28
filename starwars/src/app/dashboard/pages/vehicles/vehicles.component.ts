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

  // Atributos
  vehicles: Vehicle[] = []; // Array de especies
  page: number = 1; // Página para obtener las especies
  loadMore: boolean = true; // Indica si se pueden cargar más especies

  constructor(private vehicleService: VehiclesService, private router: Router) {} // Corregido nombre de la variable para seguir convenciones y corregido el tipo

  // Método para inicializar el componente
  ngOnInit(): void {
    this.getVehicle();
  }

  // Método para obtener las especies
  public getVehicle() {
    this.vehicleService.getVehiclesService(this.page) // Asegúrate de que el método se llame `getSpecies` en el servicio
      .subscribe({
        next: (data: { results: any; }) => {
          this.vehicles = [...this.vehicles, ...data.results];
          this.vehicles.forEach(vehicle => {
            const segments = vehicle.url.split('/');
            const id = segments[segments.length - 2];
            vehicle.id = id; // Asegúrate de que el modelo `Specie` tenga una propiedad `id`
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
    return `https://starwars-visualguide.com/#/vehicle/${id}.jpg`; // Asegúrate de que la ruta sea correcta
  }

  // Método para cargar más especies
  public loadMoreVehicle(): void {
    if (this.loadMore) {
      this.page++;
      this.getVehicle();
    }
  }

}

