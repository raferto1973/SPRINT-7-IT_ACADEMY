// app.routes.ts

import { Routes } from '@angular/router';


// Defineix les rutes per l'aplicació

export const routes: Routes = [

  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [

      {
        path: 'starships',
        title: 'Starships',
        loadComponent: () => import('./dashboard/pages/starships/starships.component'),
      },

      {
        path: 'starshi/:id',
        title: 'Starship',
        loadComponent: () => import('./dashboard/pages/starship/starship.component'),
      },

      {
        path: 'pilots',
        title: 'Pilots',
        loadComponent: () => import('./dashboard/pages/pilots/pilots.component'),
      },

      {
        path: 'films',
        title: 'Films',
        loadComponent: () => import('./dashboard/pages/films/films.component'),
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
