import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth-guard/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'mobile',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./layout/mobile-layout/mobile-layout')
        .then(m => m.MobileLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/mobile/mobile-home/mobile-home')
            .then(m => m.MobileHomeComponent)
      },
      {
        path: 'mobile-scan',
        loadComponent: () =>
          import('./features/mobile/mobile-scan/mobile-scan')
            .then(m => m.MobileScanComponent)
      }
    ]
  },
  {
    path: 'andon',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./layout/andon-layout/andon-layout').then(m => m.AndonLayoutComponent),
    children: [
      {
        path: 'andon',
        loadChildren: () =>
          import('./features/se-andon/se-andon.routes').then(m => m.andonRoutes)
      },
    ]
  },
  {
    path: 'pm',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./layout/pm-layout/pm-layout').then(m => m.PmLayoutComponent),
    children: [
      {
        path: 'pm-layout',
        loadChildren: () =>
          import('./features/se-pm/se-pm.routes').then(m => m.sePmRoutes)
      },
    ]
  },
  {
    path: 'welcome',
    canActivateChild: [AuthGuard],
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
          import('./core/auth/auth.routes').then(m => m.authRoutes)
      },
      {
        path: 'e-leave',
        loadComponent: () =>
          import('./features/hr/e-leave/e-leave').then(m => m.ELeaveComponent)
      },
      {
        path: 'role-management',
        loadComponent: () =>
          import('./core/auth/role-permission/role-management/role-management').then(m => m.RoleManagementComponent)
      },
      {
        path: 'role-permission-management',
        loadComponent: () =>
          import('./core/auth/role-permission/role-permission-management/role-permission-management').then(m => m.RolePermissionManagementComponent)
      },
      {
        path: 'user-role-management',
        loadComponent: () =>
          import('./core/auth/role-permission/user-role-management/user-role-management').then(m => m.UserRoleManagementComponent)
      },
      {
        path: 'andon',
        loadChildren: () =>
          import('./features/se-andon/se-andon.routes').then(m => m.andonRoutes)
      },
      {
        path: 'device',
        loadChildren: () =>
          import('./features/common/device/device.routes').then(m => m.deviceRoutes)
      },
       {
        path: 'nas-log',
        loadComponent: () =>
          import('./features/common/nas/nas').then(m => m.NasComponent)
      },
      {
        path: 'qa',
        loadChildren: () =>
          import('./features/se-qa/se-qa.routes').then(m => m.seQaRoutes)
      },
      {
        path: 'pu',
        loadChildren: () =>
          import('./features/se-pu/se-pu.routes').then(m => m.sePuRoutes)
      },
      {
        path: 'pe',
        loadChildren: () =>
          import('./features/se-pe/se-pe.routes').then(m => m.sePeRoutes)
      },
      {
        path: 'pm',
        loadChildren: () =>
          import('./features/se-pm/se-pm.routes').then(m => m.sePmRoutes)
      },
      {
        path: 'mf-order-material',
        loadChildren: () =>
          import('./features/se-mf/mf-order-material/mf-material.route').then(m => m.mfMaterialRoutes)
      },
      {
        path: 'material',
        loadChildren: () =>
          import('./features/se-material/se-material.routes').then(m => m.materialRoutes)
      },
      {
        path: 'no-permission',
        loadComponent: () =>
          import('./shared/components/no-permission/no-permission').then(m => m.NoPermissionComponent)
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
