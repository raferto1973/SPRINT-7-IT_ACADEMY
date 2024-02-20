// starwars.service.ts


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class StarwarsService {

  private apiUrl = 'https://swapi.py4e.com/api';
  private imageApiUrl = 'https://starwars-visualguide.com/assets/img';

  constructor(private http: HttpClient) {}

  // Mètode per obtenir les dades de les naus espacials
  public getStarships(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships/?page=${page.toString()}`);
  }

  // Mètode per obtenir les dades d'una nau espacial
  public getStarship(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships/${id}`);
  }

  // Mètode per obtenir les dades dels pilots d'una nau espacial
  public async getStarshipPicture(id: string): Promise<string> {
    try {
      const response = await fetch(`${this.imageApiUrl}/starships/${id}.jpg`);

      if (response.ok) {
        const responseData = await response.blob();
        const imageUrl = URL.createObjectURL(responseData);
        // imageUrl ahora contiene la URL de la imagen que puedes asignar a una propiedad en tu componente
        console.log('Imagen loaded succesfully:', imageUrl);
        return imageUrl;
      }
      else throw new Error('Image not available');

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  // Mètode per obtenir les dades dels pilots d'una nau espacial
  public getPilot(url: string) {
    return this.http.get<any>(url);
  }

  // Mètode per obtenir les imatges dels pilots
  public async getPilotPicture(id: string): Promise<string> {
    try {
      const response = await fetch(`${this.imageApiUrl}/characters/${id}.jpg`);

      if (response.ok) {
        const responseData = await response.blob();
        const imageUrl = URL.createObjectURL(responseData);

        console.log('Imagen loaded succesfully:', imageUrl);
        return imageUrl;
      }
      else throw new Error('Image not available');

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  // Mètode per obtenir les dades de les pel·lícules
  public getFilm(url: string) {
    return this.http.get<any>(url);
  }

  // Mètode per obtenir les imatges de les pel·lícules
  public async getFilmPicture(id: string): Promise<string> {
    try {
      const response = await fetch(`${this.imageApiUrl}/films/${id}.jpg`);

      if (response.ok) {
        const responseData = await response.blob();
        const imageUrl = URL.createObjectURL(responseData);
        // imageUrl ahora contiene la URL de la imagen que puedes asignar a una propiedad en tu componente
        console.log('Imagen loaded succesfully:', imageUrl);
        return imageUrl;
      }
      else throw new Error('Image not available');

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

}
