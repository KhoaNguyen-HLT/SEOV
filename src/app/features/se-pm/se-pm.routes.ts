import { Routes } from '@angular/router';


export const sePmRoutes: Routes = [

  {
    path: 'se-pm-layout',
    loadComponent: () =>
      import('./../se-pm/pm-layout/pm-layout')
        .then(m => m.PmLayoutComponent),
  }

];