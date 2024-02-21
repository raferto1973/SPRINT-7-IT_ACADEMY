
// films.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { StarwarsService } from '@services/starwars.service';


type Film = {
  id: string;
  title: string;
  episode: string;
  imageUrl: string;
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule, RouterOutlet],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})


export class FilmsComponent implements OnChanges {

  // URLs de les pel·lícules rebudes com a propietat d'entrada
  @Input() filmsURLs: string[] = [];

  // Array per emmagatzemar les dades de les pel·lícules
  public filmsArray: Film[] = [];

  // Injeta el servei de Star Wars
  constructor(private starWarsService: StarwarsService) {}

  // Detecta canvis en les propietats d'entrada i crida getFilms si hi ha canvis en filmsURLs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmsURLs'] && changes['filmsURLs'].currentValue) {
      this.getFilms();
    }
  }

  // Mètode per obtenir les dades de les pel·lícules
  getFilms() {

    // Crea un array d'observables per obtenir les dades de totes les pel·lícules
    const filmObservables = this.filmsURLs.map(filmURL => {

      // Extreu l'ID de la pel·lícula de la URL
      const filmID = filmURL.split("/").filter(segment => segment !== "").pop();

      // En cas d'error, retorna un observable d'un objecte d'error
      return this.starWarsService.getFilm(filmURL).pipe(
        catchError(error => of({error: true, message: error.message})),

        // Mapeja la resposta a l'estructura desitjada per a una pel·lícula
        map(res => ({
          id: filmID!,
          imageUrl: '',
          title: res.title,
          episode: 'Episode ' + res.episode_id
        })),

        // Intenta obtenir la imatge per a cada pel·lícula
        map(film => this.getFilmPicture(filmID!, film))
      );
    });


    // Utilitza forkJoin per esperar que tots els observables completen i actualitza filmsArray amb els resultats
    forkJoin(filmObservables).subscribe(films => {

      // Assigna les pel·lícules obtingudes a filmsArray
      this.filmsArray = films;
    });
  }

  getFilmPicture(id: string, film: Film) {

    // Intenta obtenir la imatge de la pel·lícula
    this.starWarsService.getFilmPicture(id).subscribe(

      // Si és exitós, actualitza l'URL de la imatge de la pel·lícula
      imageUrl => film.imageUrl = imageUrl,

      // En cas d'error, utilitza una imatge predeterminada
      error => film.imageUrl = '../../../../assets/images/not-found-starship.jpeg'
    );

    // Retorna l'objecte de la pel·lícula amb l'URL de la imatge actualitzada o predeterminada
    return film;
  }
}
