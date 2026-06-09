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
  selector: 'menu-device',
  standalone: true,
  imports: [ FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
  ],
  templateUrl: './device-menu.html',
  styleUrls: ['./device-menu.css']
})
export class MenuDeviceComponent {
  size: NzButtonSize = 'large';

  constructor(private deviceRoutes: Router) { }

  create_device() {
    this.deviceRoutes.navigate(['/welcome/device/create-device']);
  }

  list_devices() {
    this.deviceRoutes.navigate(['/welcome/device/list-device']);
  }
}
