// // starship-card.component.ts

// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { ActivatedRoute, RouterModule } from '@angular/router';

// import { StarshipsService } from '@app/services/starships.service';
// import { PilotCardComponent } from '../pilot-card/pilot-card.component';
// import { FilmCardComponent } from '../film-card/film-card.component';

// @Component({
//   selector: 'app-starships-card',
//   standalone: true,
//   imports: [CommonModule, RouterModule, PilotCardComponent, FilmCardComponent],
//   templateUrl: './starship-card.component.html',
//   styleUrl: './starship-card.component.scss'
// })

// export default class StarshipCardComponent {
//   public starshipsService = inject(StarshipsService);
//   public starshipId: string | null = null;
//   public pilotImages: string[] = [];
//   public filmImages: string[] = [];

//   constructor(private route: ActivatedRoute) {
//     this.route.params.subscribe(params => {
//       this.starshipId = params['id'];
//       if (this.starshipId) {
//         this.starshipsService.loadStarshipDetails(this.starshipId);

//         // Acceder al servicio directamente para obtener información después de cargar los detalles
//         const selectedStarship = this.starshipsService.selectedStarshipDetails();

//         if (selectedStarship) {
//           const extractedIdsPilots = this.extractIdsFromUrls(selectedStarship.pilots);
//           const extractedIdsFilms = this.extractIdsFromUrls(selectedStarship.films);

//           // Construye las URLs de las imágenes de los pilotos
//           this.pilotImages = extractedIdsPilots.map(id =>
//             `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
//           );

//           this.filmImages = extractedIdsFilms.map(id =>
//             `https://starwars-visualguide.com/assets/img/films/${id}.jpg`
//           );
//         }
//       }
//     });
//   }

//   private extractIdsFromUrls(urls: string[]): number[] {
//     return urls.map(url => {
//       const urlArr = url.split('/');
//       const id = urlArr[5];
//       return id ? parseInt(id, 10) : 0;
//     });
//   }

//   isImageLoaded(url: string | undefined): boolean {
//     if (!url) {
//       return false; // Si la URL es indefinida, la imagen no está cargada
//     }
//     const img = new Image();
//     img.src = url;
//     /* console.log(img.src);
//     console.log(img.complete);
//     console.log(img.complete && img.naturalWidth !== 0); */
//     return img.complete && img.naturalWidth !== 0;
//   }

//   isImageAvailable(url: string | undefined): boolean {
//     return !!url;
//   }

//   handleImageError(event: any) {
//     event.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
//     // event.target.alt = 'No picture available';
//   }
// }
