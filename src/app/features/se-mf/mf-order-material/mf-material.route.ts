import { Routes } from '@angular/router';


export const mfMaterialRoutes: Routes = [

  {
    path: 'mf-order-request',
    loadComponent: () =>
      import('./mf-material-menu/mf-material-menu')
        .then(m => m.MfMaterialMenuComponent),
  },
    {
    path: 'mf-material-request',
    loadComponent: () =>
      import('./mf-material-request/mf-material-request')
        .then(m => m.MfMaterialRequestComponent),
  }

];