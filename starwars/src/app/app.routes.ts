
// app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';




// Defineix les rutes per l'aplicació

export const routes: Routes = [

  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./../app/shared/users/login/login.component'),
  },

  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./../app/shared/users/register/register.component'),
  },


  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [

      {
        path: 'starships',
        title: 'Starships',
        loadComponent: () => import('./dashboard/pages/starships/starships.component'),
        canActivate: [AuthGuard]
      },

      {
        path: 'starships/:id',
        title: 'Starship',
        loadComponent: () => import('./dashboard/pages/starship/starship.component').then(c => c.StarshipComponent),
        canActivate: [AuthGuard]
      },

      {
        path: 'films',
        title: 'Films',
        loadComponent: () => import('./dashboard/pages/films/films.component'),
        canActivate: [AuthGuard]
      },

      {
        path: 'characters',
        title: 'Characters',
        loadComponent: () => import('./dashboard/pages/people/people.component'),
        canActivate: [AuthGuard]
      },

      {
        path: 'species',
        title: 'Species',
        loadComponent: () => import('./dashboard/pages/species/species.component'),
        canActivate: [AuthGuard]
      },

      {
        path: 'vehicles',
        title: 'Vehicles',
        loadComponent: () => import('./dashboard/pages/vehicles/vehicles.component'),
        canActivate: [AuthGuard]
      },

      {
        path: 'planets',
        title: 'Planets',
        loadComponent: () => import('./dashboard/pages/planets/planets.component'),
        canActivate: [AuthGuard]
      },

      {
        path: 'intro',
        title: 'Surprise me!',
        loadComponent: () => import('./dashboard/pages/intro-star-wars/intro-star-wars.component'),
        canActivate: [AuthGuard]
      },

      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }

    ]

  },

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
