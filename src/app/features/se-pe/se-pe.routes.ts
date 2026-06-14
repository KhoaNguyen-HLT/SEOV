import { Routes } from '@angular/router';


export const sePeRoutes: Routes = [

  {
    path: 'se-pe-bom',
    loadComponent: () =>
      import('./se-pe-bom/se-pe-menu/se-pe-menu')
        .then(m => m.sePeMenuComponent),
  },
  {
    path: 'se-pe-bom/se-pe-updateBom',
    loadComponent: () =>
      import('./se-pe-bom/se-pe-updateBom/se-pe-update-Bom')
        .then(m => m.sePeUpdateBomComponent),
  }

];