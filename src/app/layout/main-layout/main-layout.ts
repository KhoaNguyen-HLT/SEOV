import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  Dashboard() {
      this.router.navigate(['/welcome/dashboard']);
  }

  User() {
    this.router.navigate(['/welcome/user']);
  }

  ELeave() {
    this.router.navigate(['/welcome/e-leave']);
  }

  Expenses() {
    this.router.navigate(['/welcome/expenses']);
  }
}
