import { Routes } from '@angular/router';


export const andonRoutes: Routes = [

  {
    path: 'se-andon-call',
    loadComponent: () =>
      import('./se-andon-call/se-andon-call')
        .then(m => m.seAndonCallComponent),
  },
  {
    path: 'report',
    loadComponent: () =>
      import('./se-andon-report/se-andon-report')
        .then(m => m.seAndonReportComponent)
  },

];