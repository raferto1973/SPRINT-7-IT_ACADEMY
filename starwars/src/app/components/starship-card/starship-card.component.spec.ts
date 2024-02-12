// /**
//  * Pruebas unitarias para StarshipCardComponent:
//  * Asegura que el componente StarshipCard se inicialice correctamente al cargar los detalles de una nave espacial.
//  * Se verifica que se invoque la función 'loadStarshipDetails' del servicio 'StarshipsService' con el parámetro correcto.
//  * También se confirma que el identificador de la nave espacial en el componente se actualice correctamente.
//  */


// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { of } from 'rxjs';
// import { StarshipsService } from '@app/services/starships.service';
// import StarshipCardComponent from './starship-card.component';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';

// describe('StarshipCardComponent', () => {
//   let component: StarshipCardComponent;
//   let fixture: ComponentFixture<StarshipCardComponent>;
//   let starshipsServiceSpy: jest.SpyInstance;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [
//         CommonModule,
//         RouterModule,
//         HttpClientModule,
//         StarshipCardComponent
//       ],
//       providers: [
//         { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
//         StarshipsService,
//       ],
//     }).compileComponents();

//     // Configurar la función espía después de configurar el módulo
//     starshipsServiceSpy = jest.spyOn(TestBed.inject(StarshipsService), 'loadStarshipDetails');
//   }), 10000); // Aumenta el valor de tiempo de espera según sea necesario


//   beforeEach(() => {
//     fixture = TestBed.createComponent(StarshipCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should load starship details on initialization', () => {
//     // Actuar
//     fixture.detectChanges();

//     // Afirmar
//     expect(starshipsServiceSpy).toHaveBeenCalledWith('1');
//     expect(component.starshipId).toBe('1');
//   });
// });
