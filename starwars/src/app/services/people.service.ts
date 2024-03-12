
// people.service.ts



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PeopleService {

  private apiUrl = 'https://swapi.py4e.com/api/people/';

  constructor(private http: HttpClient) { }

  // Mètode per obtenir la llista de personatges utilizant un Observable
  getPeopleService(page: number): Observable<any> {
    console.log("Service: Character is running. Page: ", page);
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);  }

}


