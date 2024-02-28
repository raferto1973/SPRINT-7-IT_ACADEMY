import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FilmsService {

  private apiUrl = 'https://swapi.py4e.com/api/films/';
  private apiImageUrl = 'https://starwars-visualguide.com/assets/img/films/';

  constructor(private http: HttpClient) { }

  getFilmsService(page: number): Observable<any> {
    console.log("Servicio. Estamos en la pagina", page);
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);

  }

  // Mètode per obtenir les imatges de les pel·licules utilizant un Observable
  getFilmsImagesService(page: number): Observable<any> {
    console.log("Service: Films is running. Page: ", page);
    return this.http.get<any>(`${this.apiImageUrl}?page=${page}`);

  }

}



