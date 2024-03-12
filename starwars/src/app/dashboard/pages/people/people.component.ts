
// films.component.ts


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { People } from '@interfaces/people.interface';

import { PeopleService } from '../../../services/people.service';



@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule, RouterOutlet ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})


export default class PeopleComponent implements OnInit {

  // Atributs
  peoples: People[]      = [];         // Array de actors
  page: number           = 1;          // Pàgina per obtenir els actors
  loadMore: boolean      = true;       // Indica si es poden carregar més actors


  constructor(private PeopleService: PeopleService, private router: Router) {}

  // Mètode per inicialitzar el component
  ngOnInit(): void {
    this.getPeople();
  }

  // Mètode per obtenir els actors
  public getPeople() {
    this.PeopleService.getPeopleService(this.page)
        .subscribe({
          next: (data) => {
            this.peoples = this.peoples.concat(data.results);
            this.peoples.forEach(people => {
              // Suposem que la URL té l'estructura "http://exemple.com/api/people/1/"
              // on "1" és l'identificador únic de la persona.
              // Es divideix la URL per '/', s'inverteix l'array resultant per obtenir l'identificador,
              // que es troba just abans de l'últim segment (que és buit degut a la barra final de la URL).
              const segments = people.url.split('/');
              const id = segments[segments.length - 2]; // Agafa el penúltim segment, que és l'ID.
              people.id = id; // Aquesta línia suposa que afegim una propietat `id` a l'objecte `People`.
            });
          },
          error: (error) => {
            //should not load more Starships
            if (error.status === 404) this.loadMore = false;
          }
        });
  } 

  // Mètode per gestionar errors en la càrrega de les imatges
  public handleImageError(event: any) {
    event.target.src = '../../assets/placeholder/placeholder.jpg';
  }


  // Mètode per obtenir la imatge d'un actor
  public generateImageUrl(id: string): string {
    return `https://starwars-visualguide.com/#/characters/${ id }.jpg`;
  }

  // Mètode per carregar més actors
  public loadMoreFilms() {
    if (this.loadMore) {
      this.page++;
      this.getPeople();
    }
  }

  // Mètode per veure el detall d'un actor
  // public viewPeople(id: string) {
  //   this.router.navigate(['/people', id]);
  //   console.log(id);
  // }
}
