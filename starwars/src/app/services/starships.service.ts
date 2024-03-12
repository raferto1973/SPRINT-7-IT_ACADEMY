

// starships.service.ts



// Importa les llibreries i mòduls necessaris
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// INTERFICIES
import { Starship } from '../interfaces/starship.interface';
import { Film } from '@interfaces/film.interface';
import { People } from '@interfaces/people.interface';

// Servici per obtenir la llista de naus espacials de la API de Star Wars
@Injectable({
  providedIn: 'root'
})

export class StarshipsService {

  // URL de la API de Star Wars
  private apiUrl = 'https://swapi.py4e.com/api/starships/';

  // Inicialitza el servei amb el mòdul HttpClient
  constructor(private http: HttpClient) { }

  // Mètode per obtenir la llista de naus espacials utilizant un Observable
  getStarshipsService(page: number): Observable<any> {
    console.log("Service: Starships is running. Page: ", page);
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  // Mètode per obtenir la informació d'una nau espacial en concret
  getStarship(id: string): Observable<Starship> {
    return this.http.get<Starship>(`${this.apiUrl}${id}/`);
  }

  // Mètode per obtenir la informació d'una pel·lícula a partir de la seva URL
  getFilmByUrl(filmUrl: string): Observable<Film> {
    return this.http.get<Film>(filmUrl);
  }

  // Mètode per obtenir la informació d'una persona a partir de la seva URL
  getPeopleByUrl(peopleUrl: string): Observable<People> {
    return this.http.get<People>(peopleUrl);
  }
}



