

// login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../../../_services';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../_alerts/alert.component';

@Component({
    selector: 'app-login',
    standalone: true,
    providers: [AlertComponent, AlertService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, AlertComponent]
})

export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  // aquesta funció s'executa quan es carrega el component
  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  // Amb aquesta funció es pot accedir fàcilment als camps del formulari.
  get f() { return this.loginForm.controls; }

  // Amb aquesta funció es comprova si el formulari és vàlid i es fa el login.
  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.email.value, this.f.password.value)
      .subscribe({
        next: (_user) => {
          this.router.navigate(['/dashboard/starships']);        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
