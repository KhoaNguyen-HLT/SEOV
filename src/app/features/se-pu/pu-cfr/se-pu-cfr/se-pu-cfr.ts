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
  selector: 'app-se-pu-cfr',
  standalone: true,
  imports: [FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
    AppIconComponent,
    NoPermissionComponent
  ],
  templateUrl: './se-pu-cfr.html',
  styleUrls: ['./se-pu-cfr.css']
})
export class sePuCfrComponent {
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
      'ADMIN',
      'PU_CFR',
      'PU_MANAGER',
    ];

    this.hasPermission = allowedPermissions.some(permission =>
      this.AuthService.permissions?.includes(permission)
    );


  }

  getData() {
    this.router.navigate(['/welcome/pu/se-pu-cfr-getData']);
  }

  getCrossInOutData() {
    this.router.navigate(['/welcome/pu/se-pu-cfr-getCrossInOutData']);
  }

  getCrossIvtData() {
    this.router.navigate(['/welcome/pu/se-pu-cfr-getCrossIvtData']);
  }

  getMasterData() {
    this.router.navigate(['/welcome/pu/se-pu-cfr-getMasterData']);
  }

  getReportData() {
    this.router.navigate(['/welcome/pu/se-pu-cfr-getReportData']);
  }

   getHisData() {
    this.router.navigate(['/welcome/pu/se-pu-cfr-getHisData']);
  }

}