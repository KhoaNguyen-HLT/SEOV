import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.LoginComponent)
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent)},
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
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
          import('./features/user/user').then(m => m.UserComponent)
      }
    ]
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'e-leave',
        loadComponent: () =>
          import('./features/hr/e-leave/e-leave').then(m => m.ELeaveComponent)
      }
    ]
  },


  {
    path: '**',
    redirectTo: 'login'
  }
];