import { Routes } from '@angular/router';


export const sePmRoutes: Routes = [

  {
    path: 'se-pm-layout',
    loadComponent: () =>
      import('./../se-pm/pm-layout/pm-layout')
        .then(m => m.PmLayoutComponent),
  },
  {
    path: 'pm-agsp',
    loadComponent: () =>
      import('./../se-pm/pm-agsp/pm-agsp/pm-agsp')
        .then(m => m.PmAgspComponent),
  },
  {
    path: 'pm-agsp-getData',
    loadComponent: () =>
      import('./../se-pm/pm-agsp/pm-agsp-getData/pm-agsp-getData')
        .then(m => m.sePmAgspGetDataComponent),
  },
  {
    path: 'pm-agsp-shipping-plan',
    loadComponent: () =>
      import('./pm-agsp/pm-agsp-shipping-plan/pm-agsp-shipping-plan')
        .then(m => m.sePmAgspShippingPlanComponent),
  }


];