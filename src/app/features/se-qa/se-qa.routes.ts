import { Routes } from '@angular/router';


export const seQaRoutes: Routes = [

  {
    path: 'se-qa-iqc',
    loadComponent: () =>
      import('./se-qa-iqc/se-qa-iqc')
        .then(m => m.seQaIqcComponent),
  }
  ,
  {
    path: 'se-qa-iqc-getData',
    loadComponent: () =>
      import('./se-qa-iqc-getData/se-qa-iqc-getData')
        .then(m => m.seQaIqcGetDataComponent),
  }

];