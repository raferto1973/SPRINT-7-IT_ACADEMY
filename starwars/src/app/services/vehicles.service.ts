

//vehicles.service.ts


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class VehiclesService {

  private apiUrl = 'https://swapi.py4e.com/api/vehicles/';

  constructor(private http: HttpClient) { }

  // Mètode per obtenir la llista de vehicles utilizant un Observable
  getVehiclesService(page: number): Observable<any> {
    console.log("Service: Vehicles are running. Page: ", page);
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);

  }

}
