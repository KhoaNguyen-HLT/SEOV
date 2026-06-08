import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
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
  selector: 'app-mobile-layout',
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
    RouterModule
  ],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: [ToolOutline, ControlOutline]
    }
  ],
  templateUrl: './mobile-layout.html',
  styleUrls: ['./mobile-layout.css']
})
export class MobileLayoutComponent {

  constructor(private router: Router,
    // private TokenStorageService: TokenStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }
  
}
