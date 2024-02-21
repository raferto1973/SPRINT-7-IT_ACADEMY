// starwars.service.ts

// Import the core angular services.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class StarwarsService {

  // Define the API base URL and the image API base URL.
  private apiUrl = 'https://swapi.py4e.com/api';
  private imageApiUrl = 'https://starwars-visualguide.com/assets/img';

  constructor(private http: HttpClient) {}

  // Mètode per obtenir les dades de les naus espacials
  public getStarships(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships/?page=${page}`).pipe(
      catchError(error => throwError(error))
    );
  }

  // Mètode per obtenir les dades d'una nau espacial
  public getStarship(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships/${id}`).pipe(
      catchError(error => throwError(error))
    );
  }

  // Mètode per obtenir la imatge d'una nau espacial
  public getStarshipPicture(id: string): Observable<string> {
    return this.http.get(`${this.imageApiUrl}/starships/${id}.jpg`, { responseType: 'blob' }).pipe(
      map(blob => URL.createObjectURL(blob)),
      catchError(error => {
        console.error('Fetch error:', error);
        return throwError(error);
      })
    );
  }

  // Mètode per obtenir les dades dels pilots d'una nau espacial
  public getPilot(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(error => throwError(error))
    );
  }

  // Mètode per obtenir les imatges dels pilots
  public getPilotPicture(id: string): Observable<string> {
    return this.http.get(`${this.imageApiUrl}/characters/${id}.jpg`, { responseType: 'blob' }).pipe(
      map(blob => URL.createObjectURL(blob)),
      catchError(error => {
        console.error('Fetch error:', error);
        return throwError(error);
      })
    );
  }

  // Mètode per obtenir les dades de les pel·lícules
  public getFilm(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(error => throwError(error))
    );
  }

  // Mètode per obtenir les imatges de les pel·lícules
  public getFilmPicture(id: string): Observable<string> {
    return this.http.get(`${this.imageApiUrl}/films/${id}.jpg`, { responseType: 'blob' }).pipe(
      map(blob => URL.createObjectURL(blob)),
      catchError(error => {
        console.error('Fetch error:', error);
        return throwError(error);
      })
    );
  }
}
