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
    path: 'se-pu-cfr-getCrossInOutData',
    loadComponent: () =>
      import('./pu-cfr/se-pu-cfr-getCrossInOutData/se-pu-cfr-getCrossInOutData')
        .then(m => m.sePuCfrGetCrossInOutDataComponent),
  }
  ,
  {
    path: 'se-pu-cfr-getCrossIvtData',
    loadComponent: () =>
      import('./pu-cfr/se-pu-cfr-getCrossIvtData/se-pu-cfr-getCrossIvtData')
        .then(m => m.sePuCfrGetCrossIvtDataComponent),
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
  },
    {
    path: 'se-pu-cfr-getHisData',
    loadComponent: () =>
      import('./pu-cfr/se-pu-cfr-history/se-pu-cfr-history')
        .then(m => m.sePuCfrHisComponent),
  },
  {
    path: 'se-pu-dpm-getData',
    loadComponent: () =>
      import('./pu-dpm/se-pu-dpm-getData/se-pu-dpm-getData')
        .then(m => m.sePuDpmGetDataComponent),
  }

];