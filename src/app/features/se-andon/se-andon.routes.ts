import { Routes } from '@angular/router';


export const andonRoutes: Routes = [

  {
    path: 'se-andon-call',
    loadComponent: () =>
      import('./se-andon-call/se-andon-call')
        .then(m => m.seAndonCallComponent),
  },
  {
    path: 'se-andon-report',
    loadComponent: () =>
      import('./se-andon-report/se-andon-report')
        .then(m => m.seAndonReportComponent)
  },
  {
    path: 'se-andon-request',
    loadComponent: () =>
      import('./se-andon-request/se-andon-request')
        .then(m => m.seAndonRequestComponent)
  },
  {
    path: 'se-andon-dashboard',
    loadComponent: () =>
      import('./se-andon-dashboard/se-andon-dasboard')
        .then(m => m.seAndonDashboardComponent)
  }

];