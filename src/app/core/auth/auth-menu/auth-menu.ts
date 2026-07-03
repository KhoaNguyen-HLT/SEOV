import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NoPermissionComponent } from '../../../shared/components/no-permission/no-permission';
import { AuthService } from '../../../core/auth/service/auth.service';

@Component({
  selector: 'auth-menu',
  standalone: true,
  imports: [FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
    NoPermissionComponent
  ],
  templateUrl: './auth-menu.html',
  styleUrls: ['./auth-menu.css']
})
export class AuthMenuComponent {
  size: NzButtonSize = 'large';
  hasPermission = false;
  userName: String = '';

  constructor(private userRoutes: Router, private AuthService: AuthService) { }

  ngOnInit() {
    this.getUserInfor();
  }
  getUserInfor(): void {
    this.AuthService.getUserInfobyToken();
    this.userName = this.AuthService.userName;
    console.log(this.AuthService.permissions);
    if(this.AuthService.permissions.includes('SUPER_ADMIN')) {
      this.hasPermission = true
    }


  }

  role_management() {
    this.userRoutes.navigate(['/welcome/auth/role-management']);
  }

  permission() {
    this.userRoutes.navigate(['/welcome/auth/permission-management']);
  }

  user_role_management() {
    this.userRoutes.navigate(['/welcome/auth/user-role-management']);
  }
  role_permission_management() {
    this.userRoutes.navigate(['/welcome/auth/role-permission-management']);
  }

}
