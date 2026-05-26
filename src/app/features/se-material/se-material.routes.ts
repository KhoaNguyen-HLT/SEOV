import { Routes } from '@angular/router';


export const materialRoutes: Routes = [

  {
    path: 'se-material-transaction',
    loadComponent: () =>
      import('./material-transaction/material-transaction')
        .then(m => m.MaterialTransactionComponent),
  },
  {
    path: 'se-material-print-label',
    loadComponent: () =>
      import('./material-print-label/material-print-label')
        .then(m => m.MaterialPrintLabelComponent),
  }

];