// // starships-list.component.spec.ts

// /**
//  * Pruebas unitarias para StarshipsListComponent:
//  * 1. Debería cargar la página siguiente y actualizar la página actual.
//  * 2. Debería cargar la página anterior y actualizar la página actual.
//  * 3. Debería cargar una página específica y actualizar la página actual.
//  */


// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import StarshipsListComponent from './starships-list.component';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

// describe('StarshipsListComponent', () => {
//   let component: StarshipsListComponent;
//   let fixture: ComponentFixture<StarshipsListComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [
//         CommonModule,
//         RouterModule,
//         StarshipsListComponent,
//         HttpClientModule
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(StarshipsListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should load next page', waitForAsync(() => {
//     const loadNextPageSpy = jest.spyOn(component.starshipsService, 'loadNextPage').mockReturnValue(undefined);
//     component.loadNextPage();
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       expect(component.currentPageNumber).toBeGreaterThan(1);
//       expect(loadNextPageSpy).toHaveBeenCalled();
//     });
//   }));

//   it('should load previous page', waitForAsync(() => {
//     const loadNextPageSpy = jest.spyOn(component.starshipsService, 'loadNextPage').mockReturnValue(undefined);
//     const loadPreviousPageSpy = jest.spyOn(component.starshipsService, 'loadPreviousPage').mockReturnValue(undefined);
//     component.loadNextPage();
//     component.loadPreviousPage();
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       expect(component.currentPageNumber).toBe(1);
//       expect(loadNextPageSpy).toHaveBeenCalled();
//       expect(loadPreviousPageSpy).toHaveBeenCalled();
//     });
//   }));


//   it('should load specific page', () => {
//     const pageNumber = 3;
//     component.loadPage(pageNumber);
//     expect(component.currentPageNumber).toBe(pageNumber);
//   });
// });
