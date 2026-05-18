import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { ToolOutline, ControlOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenStorageService } from '../../core/auth/service/token-storage.service';


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

  constructor(private router: Router,
    private TokenStorageService: TokenStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.TokenStorageService.removeToken();
      this.router.navigate(['/login']);
    }

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

  ELeave() {
    this.router.navigate(['/welcome/e-leave']);
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


  IQC() {
    this.router.navigate(['/welcome/qa/se-qa-iqc']);
  }
}
