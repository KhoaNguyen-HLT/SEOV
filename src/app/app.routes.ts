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
        path: 'permission-management',
        loadComponent: () =>
          import('./core/auth/role-permission/permission-management1/permission-management1').then(m => m.PermissionManagementComponent1)
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
        path: 'material',
        loadChildren: () =>
          import('./features/se-material/se-material.routes').then(m => m.materialRoutes)
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
