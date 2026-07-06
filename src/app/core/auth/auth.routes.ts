import { Routes } from '@angular/router';


export const authRoutes: Routes = [

    {
        path: '',
        loadComponent: () =>
            import('./auth-menu/auth-menu')
                .then(m => m.AuthMenuComponent),
    },
    {
        path: 'role-management',
        loadComponent: () =>
            import('./role-permission/role-management/role-management')
                .then(m => m.RoleManagementComponent)
    },

    {
        path: 'permission-management',
        loadComponent: () =>
            import('./role-permission/permission-management/permission-management')
                .then(m => m.PermissionManagementComponent)
    },
    {
        path: 'role-permission-management',
        loadComponent: () =>
            import('./role-permission/role-permission-management/role-permission-management')
                .then(m => m.RolePermissionManagementComponent)
    },
    {
        path: 'user-role-management',
        loadComponent: () =>
            import('./role-permission/user-role-management/user-role-management')
                .then(m => m.UserRoleManagementComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import('./reset-password/reset-password')
                .then(m => m.ResetPasswordComponent)
    },
     {
        path: 'change-password',
        loadComponent: () =>
            import('./change-password/change-password')
                .then(m => m.ChangePasswordComponent)
    }



];