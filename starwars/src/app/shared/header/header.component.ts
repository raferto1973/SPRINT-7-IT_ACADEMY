
// header.component.ts

// Aquest component és el header de l'aplicació. Conté el menú de navegació i el botó de logout.


import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterOutlet, Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { AccountService } from '../../_services';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;
  constructor(private accountService: AccountService, private router: Router) {}
  firstName: string = '';

  ngOnInit(): void {
    this.userSubscription = this.accountService.user.subscribe(user => {
      this.isLoggedIn = !!user;
      this.firstName = user?.firstName ?? '';
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

  onLogoClick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/starships']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
