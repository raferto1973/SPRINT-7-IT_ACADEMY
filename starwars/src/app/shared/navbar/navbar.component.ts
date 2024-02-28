

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public menuItems = routes
  .map( route => route.children ?? [] )
  .flat()
  .filter( route => route && route.path)
  .filter( route => !route.path?.includes('/'))



  constructor() {


  }

}
