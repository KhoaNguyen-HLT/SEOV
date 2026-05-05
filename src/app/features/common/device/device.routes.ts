import { Routes } from '@angular/router';


export const deviceRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./device-menu/device-menu')
        .then(m => m.MenuDeviceComponent),
  },
  {
    path: 'create-device',
    loadComponent: () =>
      import('./create-device/create-device')
        .then(m => {
          return m.CreateDeviceComponent
        })
  },

  {
    path: 'list-device',
    loadComponent: () =>
      import('./list-device/list-device')
        .then(m => m.ListDeviceComponent)
  }


];