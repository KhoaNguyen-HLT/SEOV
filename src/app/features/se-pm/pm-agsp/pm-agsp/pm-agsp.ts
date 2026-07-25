import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NoPermissionComponent } from '../../../../shared/components/no-permission/no-permission';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { AppIconComponent } from '../../../../shared/components/icon/icon-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-se-pm-agsp',
  standalone: true,
  imports: [FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
    // AppIconComponent,
    NoPermissionComponent
  ],
  templateUrl: './pm-agsp.html',
  styleUrls: ['./pm-agsp.css']
})
export class PmAgspComponent {
  hasPermission = false;
  userName: String = '';
  size: NzButtonSize = 'large';
  constructor(private router: Router, private AuthService: AuthService) { }

  ngOnInit() {
    this.checkPermission();
  }
  checkPermission(): void {
    const allowedPermissions = [
      'SUPER_ADMIN',
      'ADMIN'
    ];

    this.hasPermission = allowedPermissions.some(permission =>
      this.AuthService.permissions?.includes(permission)
    );


  }

  getData() {
    console.log("khoa")
    this.router.navigate(['/welcome/pm/pm-agsp-getData']);
  }


  getMasterData() {
    this.router.navigate(['/welcome/pu/se-pm-agsp-getMasterData']);
  }

  getReportData() {
    this.router.navigate(['/welcome/pm/pm-agsp-shipping-plan']);
  }

}