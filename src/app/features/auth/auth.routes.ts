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
        path: 'permission-management1',
        loadComponent: () =>
            import('./role-permission/permission-management1/permission-management1')
                .then(m => m.PermissionManagementComponent1)
    },
    {
        path: 'user-role-management',
        loadComponent: () =>
            import('./role-permission/user-role-management/user-role-management')
                .then(m => m.UserRoleManagementComponent)
    }


];