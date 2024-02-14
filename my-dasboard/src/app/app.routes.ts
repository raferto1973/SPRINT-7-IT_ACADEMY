import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [

    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }


];
