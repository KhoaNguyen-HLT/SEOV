import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.LoginComponent)
  },

  {
    path: 'welcome',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./features/user/user.routes').then(m => m.userRoutes)
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then(m => m.authRoutes)
      },
      {
        path: 'e-leave',
        loadComponent: () =>
          import('./features/hr/e-leave/e-leave').then(m => m.ELeaveComponent)
      },
      {
        path: 'role-management',
        loadComponent: () =>
          import('./features/auth/role-permission/role-management/role-management').then(m => m.RoleManagementComponent)
      },
      {
        path: 'permission-management',
        loadComponent: () =>
          import('./features/auth/role-permission/permission-management1/permission-management1').then(m => m.PermissionManagementComponent1)
      },
      {
        path: 'user-role-management',
        loadComponent: () =>
          import('./features/auth/role-permission/user-role-management/user-role-management').then(m => m.UserRoleManagementComponent)
      },
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
