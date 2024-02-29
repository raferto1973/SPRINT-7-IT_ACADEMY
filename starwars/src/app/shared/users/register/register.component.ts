

// register.component.ts

// Aquest component és la pàgina de registre de l'aplicació. Aquest component mostra un formulari de registre. Els usuaris poden registrar-se a l'aplicació amb el seu nom, cognom, correu electrònic i contrasenya.

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { FakeBackendService } from './../../../_helpers/fake-backend-service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../_alerts/alert.component';
import { AlertService } from '../../../_services';

import { AccountService } from '../../../_services';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AlertComponent, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {

    // redirigeix a la pàgina de dashboard si ja estàs autenticat
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }

  // Aquest mètode s'executa quan es carrega el component
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Amb aquest mètode es pot accedir fàcilment als camps del formulari.
  get f() { return this.registerForm.controls; }

  // Amb aquest mètode es comprova si el formulari és vàlid i es fa el registre.
  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    // Si el formulari no és vàlid, no es fa res
    if (this.registerForm.invalid) {
      return;
    }

    // es mostra el spinner de carrega
    this.loading = true;

    // es fa el registre
    this.accountService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          // Aquí fem el login directament després del registre
          this.accountService.login(this.f.email.value, this.f.password.value)
            .subscribe({
              next: () => {
                this.router.navigate(['/dashboard/starships']);
              },
              error: error => {
                this.alertService.error(error);
                this.loading = false;
              }
            });
        },

        // Si hi ha un error, es mostra un missatge d'error
        error: (error) => {
          // Intenta accedir directament a la propietat error.message de la resposta
          // Suposant que l'error sigui retornat com un objecte Error de JavaScript amb el missatge com a JSON
          let errorObj;
          this.errorMessage = error.mapessage;
          try {
            errorObj = JSON.parse(error.error);
          } catch (e) {
            console.error('Error parsing error message:', e);
          }
          this.errorMessage = errorObj?.error?.message || 'No pots registrar un email ja registrat previament.';
          this.loading = false;
        }

      });
  }

  // Mètode públic per obtenir l'estat d'alerta
  public getAlert() {
    return this.alertService.onAlert();
  }
}
