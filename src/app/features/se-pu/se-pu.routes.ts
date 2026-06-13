import { Routes } from '@angular/router';


export const sePuRoutes: Routes = [

  {
    path: 'se-pu-cfr',
    loadComponent: () =>
      import('./se-pu-cfr/se-pu-cfr')
        .then(m => m.sePuCfrComponent),
  }
  ,
  {
    path: 'se-pu-cfr-getData',
    loadComponent: () =>
      import('./se-pu-cfr-getData/se-pu-cfr-getData')
        .then(m => m.sePuCfrGetDataComponent),
  }
  ,
  {
    path: 'se-pu-cfr-getMasterData',
    loadComponent: () =>
      import('./se-pu-cfr-getMasterData/se-pu-cfr-getMasterData')
        .then(m => m.sePuCfrGetMasterDataComponent),
  }
  ,
  {
    path: 'se-pu-cfr-getReportData',
    loadComponent: () =>
      import('./se-pu-cfr-report/se-pu-cfr-report')
        .then(m => m.sePuCfrReportComponent),
  }

];