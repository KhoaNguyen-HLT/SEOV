import { Routes } from '@angular/router';


export const sePuRoutes: Routes = [

  {
    path: 'se-pu-cfr',
    loadComponent: () =>
      import('./pu-cfr/se-pu-cfr/se-pu-cfr')
        .then(m => m.sePuCfrComponent),
  }
  ,
  {
    path: 'se-pu-dpm',
    loadComponent: () =>
      import('./pu-dpm/se-pu-dpm/se-pu-dpm')
        .then(m => m.sePuDpmComponent),
  }
  ,
  {
    path: 'se-pu-cfr-getData',
    loadComponent: () =>
      import('./pu-cfr/se-pu-cfr-getData/se-pu-cfr-getData')
        .then(m => m.sePuCfrGetDataComponent),
  }
  ,
  {
    path: 'se-pu-cfr-getMasterData',
    loadComponent: () =>
      import('./pu-cfr/se-pu-cfr-getMasterData/se-pu-cfr-getMasterData')
        .then(m => m.sePuCfrGetMasterDataComponent),
  }
  ,
  {
    path: 'se-pu-cfr-getReportData',
    loadComponent: () =>
      import('./pu-cfr/se-pu-cfr-report/se-pu-cfr-report')
        .then(m => m.sePuCfrReportComponent),
  }

];