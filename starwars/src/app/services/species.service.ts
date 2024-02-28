

// species.service.ts


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SpeciesService {
  getSpecies(page: number) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://swapi.dev/api/species/';

  constructor(private http: HttpClient) { }

  // Mètode per obtenir la llista de especies utilizant un Observable
  getSpeciesService(page: number): Observable<any> {
    console.log("Service: Species is running. Page: ", page);
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);

  }

}
