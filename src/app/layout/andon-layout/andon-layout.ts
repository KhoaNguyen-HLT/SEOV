import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { ToolOutline, ControlOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-andon-layout',
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
  templateUrl: './andon-layout.html',
  styleUrls: ['./andon-layout.css']
})
export class AndonLayoutComponent {


}
