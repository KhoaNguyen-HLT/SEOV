import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then(m => m.LoginComponent)
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)},
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import('./pages/user/user').then(m => m.UserComponent)
      }
    ]
  },


  // {
  //   path: '**',
  //   redirectTo: 'login'
  // }
];