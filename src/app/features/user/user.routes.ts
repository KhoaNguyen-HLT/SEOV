import { Routes } from '@angular/router';


export const userRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
    import('./menu-user/menu-user')
        .then(m => m.MenuUserComponent),
  },
   {
    path: 'create',
    loadComponent: () =>
      import('./create-user/create-user')
        .then(m => m.CreateUserComponent)
  },

  {
    path: 'list',
    loadComponent: () =>
      import('./list-users/list-users')
        .then(m => m.ListUsersComponent)
  }

  
];