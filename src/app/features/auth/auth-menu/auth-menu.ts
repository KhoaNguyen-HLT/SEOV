import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-menu',
  standalone: true,
  imports: [
    RouterOutlet, FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
  ],
  templateUrl: './auth-menu.html',
  styleUrls: ['./auth-menu.css']
})
export class AuthMenuComponent {
  size: NzButtonSize = 'large';

  constructor(private userRoutes: Router) { }

  role_management() {
    console.log('khoacheck user...');
    this.userRoutes.navigate(['/welcome/auth/role-management']);
  }

  permission() {
    this.userRoutes.navigate(['/welcome/auth/permission-management']);
  }

  user_role_management() {
    this.userRoutes.navigate(['/welcome/auth/user-role-management']);
  }
}
