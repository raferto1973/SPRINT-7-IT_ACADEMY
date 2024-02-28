
//planets.service.ts




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PlanetsService {

  private apiUrl = 'https://swapi.py4e.com/api/planets/';

  constructor(private http: HttpClient) { }

  // Mètode per obtenir la llista de planetes utilizant un Observable
  getPlanetsService(page: number): Observable<any> {
    console.log("Service: Panets is running. Page: ", page);
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);

  }

}
