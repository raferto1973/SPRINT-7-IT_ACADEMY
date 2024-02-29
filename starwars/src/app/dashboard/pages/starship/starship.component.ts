
// starship.component.ts


// Importa les llibreries i mòduls necessaris
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

// SERVEIS
import { StarshipsService } from '@services/starships.service';
import { Starship } from '@interfaces/starship.interface';

// INTERFICIES
import { Film } from '@interfaces/film.interface';
import { People } from '@interfaces/people.interface';




@Component({
  selector: 'app-starship-file',
  standalone: true,
  imports: [ CommonModule, InfiniteScrollModule, RouterModule, RouterOutlet, StarshipComponent  ],
  templateUrl: './starship.component.html',
})


// Classe que defineix el component de la pàgina de les naus
export class StarshipComponent implements OnInit {

  private starshipsService = inject(StarshipsService);

  public starshipId: string | null  = null;
  public starship?: Starship;

  public pilots: People[] = [];
  public films: Film[]  = [];



  // Constructor amb els serveis necessaris per obtenir les dades de les naus
  constructor(private route: ActivatedRoute) {}


  // Mètode per inicialitzar la pàgina
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.starshipId = params.get('id');
      if (this.starshipId) {
        this.loadStarshipData(this.starshipId);
      }
    });
  }

  //Mèetode per carregar les dades de cada nau
  loadStarshipData(id: string): void {
    this.starshipsService.getStarship(id).subscribe({
      next: (data) => {
        this.starship = {
           ...data,
           imageURL: `https://starwars-visualguide.com/assets/img/starships/${id}.jpg` // Assigna la URL de la imatge
          }
          this.loadFilmData(data.films);
          this.loadPilotsData(data.pilots);
        },
        error: (error) => {
          console.error('Error fetching starship data:', error);
        }
      });
    }

  // Mètode per carregar les dades de les pel·lícules
  loadFilmData(filmUrls: string[]): void {
    filmUrls.forEach(url => {
      this.starshipsService.getFilmByUrl(url).subscribe({
        next: (filmData) => {
          this.films.push(filmData);
        },
        error: (error) => console.error('Error fetching film data:', error)
      });
    });
  }

  // Mètode per carregar les dades dels pilots
  loadPilotsData(peopleUrls: string[]): void {
    this.pilots = []; // Reinicia l'array per assegurar que està buit abans de començar
    peopleUrls.forEach(url => {
      this.starshipsService.getPeopleByUrl(url).subscribe({
        next: (peopleData) => {
          this.pilots.push(peopleData);
        },
        error: (error) => console.error('Error fetching pilot data:', error)
      });
    });
    console.log('Pilots:', this.pilots);
  }

  // Mètode per extreure l'ID de la URL
  extractId(url: string): string {
    const idPattern = /\/([0-9]+)\/$/;
    const match = url.match(idPattern);
    return match ? match[1] : 'unknown';
  }

  // Mètode per gestionar errors en la càrrega de les imatges
  public handleImageError(event: any) {
   event.target.src = '../../assets/placeholder/placeholder.jpg';
  }

}



