
// films.component.ts

// Mòduls
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

// Mòdul per fer scroll infinit
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Serveis
import { FilmsService } from '@services/films.service';

// Interfícies
import { Film } from '@interfaces/film.interface';

// Components
import { StarshipComponent } from '../starship/starship.component';



@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule, RouterOutlet, StarshipComponent ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})


export default class FilmComponent implements OnInit {


  public films: Film[]      = [];         // Array de pel·lícules
  private page: number      = 1;          // Pàgina per obtenir les pel·lícules
  public loadMore: boolean  = true;       // Indica si es poden carregar més pel·lícules


  // Constructor amb una instància del servei de pel·lícules i del router
  constructor(private FilmsService: FilmsService, private router: Router) {}

  // Mètode per inicialitzar el component
  ngOnInit(): void {
    this.getFilms();
  }

  // Mètode per obtenir les pel·lícules
  public getFilms() {
    this.FilmsService.getFilmsService(this.page)
        .subscribe({
          next: (data) => {
            this.films = this.films.concat(data.results);
            this.films.forEach(film => {
              film.episode_id = parseInt(film.url.split('/').reverse()[1]);
            });
          },
          error: (error) => {

            // Si no hi ha més pel·lícules per carregar, desactivem el botó de carregar més
            if (error.status === 404) this.loadMore = false;
          }
        });
  }

  // Mètode per gestionar errors en la càrrega de les imatges
  public handleImageError(event: any) {
    event.target.src = '../../assets/placeholder/placeholder.jpg';
  }


  // Mètode per obtenir la imatge d'un planeta
  public getFilmImage(film: Film) {
    return `https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`;
  }

  // Mètode per carregar més planetes
  public loadMoreFilms() {
    if (this.loadMore) {
      this.page++;
      this.getFilms();
    }
  }

  // Mètode per veure el detall d'una nau
  // public viewFilm(id: string) {
  //   this.router.navigate(['/films', id]);
  //   console.log(id);
  // }
}
