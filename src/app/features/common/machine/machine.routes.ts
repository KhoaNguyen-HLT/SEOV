import { Routes } from '@angular/router';


export const machineRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./machine-menu/machine-menu')
        .then(m => m.MenuMachineComponent),
  },
  {
    path: 'create-machine',
    loadComponent: () =>
      import('./create-machine/create-machine')
        .then(m => {
          return m.CreateMachineComponent
        })
  },

  // {
  //   path: 'list',
  //   loadComponent: () =>
  //     import('./list-users/list-users')
  //       .then(m => m.ListUsersComponent)
  // }


];