// /**
//  * Pruebas unitarias para PilotCardComponent:
//  * 1. Verifica que el componente muestre correctamente las imágenes de pilotos cuando se proporciona un array de imágenes.
//  *    - Confirma que la cantidad y las fuentes de las imágenes coincidan con los datos proporcionados.
//  * 2. Asegura que el componente presente un mensaje apropiado cuando no hay imágenes de pilotos.
//  *    - Garantiza que el mensaje se muestre adecuadamente cuando el array de imágenes está vacío.
//  */


// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { CommonModule } from '@angular/common';
// import { PilotCardComponent } from './pilot-card.component';
// // import PilotCardComponent from './pilot-card.component';

// describe('PilotCardComponent', () => {
//   let component: PilotCardComponent;
//   let fixture: ComponentFixture<PilotCardComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [CommonModule, PilotCardComponent],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PilotCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should display pilot images when pilotImages array is not empty', () => {
//     // Arrange
//     component.pilotImages = ['image1.jpg', 'image2.jpg'];

//     // Actuar
//     fixture.detectChanges();

//     // Afirmar
//     const imgElements = fixture.nativeElement.querySelectorAll('img');
//     expect(imgElements.length).toBe(2);
//     expect(imgElements[0].getAttribute('src')).toBe('image1.jpg');
//     expect(imgElements[1].getAttribute('src')).toBe('image2.jpg');
//   });

//   it('should display a message when pilotImages array is empty', () => {
//     // Arrange
//     component.pilotImages = [];

//     // Actuar
//     fixture.detectChanges();

//     // Afirmar
//     const messageElement = fixture.nativeElement.querySelector('p');
//     expect(messageElement.textContent.trim()).toBe('There are no related items for this category');
//   });
// });
