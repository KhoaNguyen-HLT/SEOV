import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { ToolOutline, ControlOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/service/auth.service';
import { UserService } from '../../../app/features/user/user.service';
import { TokenStorageService } from '../../core/auth/service/token-storage.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


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
    ReactiveFormsModule,
    NzDropDownModule,
    CommonModule
  ],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: [ToolOutline, ControlOutline]
    }
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent {
  currentUser: any = {};
  username: any = '';
  name: any = '';
  constructor(private router: Router,
    private TokenStorageService: TokenStorageService,
    private AuthService: AuthService,
    private UserService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {
      this.getUserInfo();
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.TokenStorageService.removeToken();
      this.router.navigate(['/login']);
    }

  }


  getUserInfo() {
    this.AuthService.getUserInfobyToken();
    this.username = this.AuthService.userName;
    this.name = this.AuthService.name;

    if (!this.username) return;

    this.UserService.getUserByUsername(this.username).subscribe({
      next: (res: any) => {
        this.currentUser = res.data;
        // this.name = res.data.name;
        // console.log('Current user:', this.currentUser);
      },
      error: err => console.error(err)
    });
  }



  viewProfile(): void {
    this.router.navigate(['/welcome/profile']);
  }

  changePassword(): void {
    this.router.navigate(['/welcome/auth/change-password']);
  }

  Dashboard() {
    this.router.navigate(['/welcome/dashboard']);
  }

  User() {
    this.router.navigate(['/welcome/user']);
  }

  Auth() {
    this.router.navigate(['/welcome/auth']);
  }

  inputMaterial() {
    this.router.navigate(['/welcome/material/se-material-transaction'],
      {
        queryParams: {
          flow_code: 'RECEIVE_TO_WH'
        }
      }
    );
  }

  printLabel() {
    this.router.navigate(['/welcome/material/se-material-print-label']);
  }

  Expenses() {
    this.router.navigate(['/welcome/expenses']);
  }

  AndonCall() {
    this.router.navigate(['/welcome/andon/se-andon-call']);
  }

  AndonReport() {
    this.router.navigate(['/welcome/andon/se-andon-report']);
  }

  AndonRequest() {
    this.router.navigate(['/welcome/andon/se-andon-request']);
  }

  AndonScreen() {
    this.router.navigate(['/andon/andon/se-andon-call']);
  }
  AndonDashboard() {
    this.router.navigate(['/andon/andon/se-andon-dashboard']);
  }

  Device() {
    this.router.navigate(['/welcome/device']);
  }
  // PM department

  PmAgsp() {
    this.router.navigate(['/welcome/pm/pm-agsp']);
  }

  // QA department
  IQC() {
    this.router.navigate(['/welcome/qa/se-qa-iqc']);
  }
  // Pu department
  CFR() {
    this.router.navigate(['/welcome/pu/se-pu-cfr']);
  }

  DPM() {
    this.router.navigate(['/welcome/pu/se-pu-dpm']);
  }
  // MF department
  mfMaterialRequest() {
    this.router.navigate(['/welcome/mf-order-material/mf-order-request']);
  }
  // PE department
  BOM() {
    this.router.navigate(['/welcome/pe/se-pe-bom']);
  }

  // NAS
  NasLog() {
    this.router.navigate(['/welcome/nas-log']);
  }
}
