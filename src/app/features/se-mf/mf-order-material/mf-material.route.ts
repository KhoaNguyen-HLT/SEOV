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
  ,
  {
    path: 'mf-material-list-request',
    loadComponent: () =>
      import('./mf-material-list-request/mf-material-list-request')
        .then(m => m.MfMaterialRequestListComponent),
  }

  ,
  {
    path: 'mf-material-request-detail',
    loadComponent: () =>
      import('./mf-material-request-detail/mf-material-request-detail')
        .then(m => m.MfMaterialRequestDetailComponent),
  }
  ,
  {
    path: 'mf-material-approve-request',
    loadComponent: () =>
      import('./mf-material-approve-request/mf-material-approve-request')
        .then(m => m.MfMaterialApproveRequestComponent),
  }
    ,
  {
    path: 'mf-material-list-approve',
    loadComponent: () =>
      import('./mf-material-list-approve/mf-material-list-approve')
        .then(m => m.MfMaterialApproveListComponent),
  }
      ,
  {
    path: 'mf-material-list-his',
    loadComponent: () =>
      import('./mf-material-list-his/mf-material-list-his')
        .then(m => m.MfMaterialHisListComponent),
  }


];