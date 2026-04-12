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
  selector: 'menu-user',
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
  templateUrl: './menu-user.html',
  styleUrls: ['./menu-user.css']
})
export class MenuUserComponent {
  size: NzButtonSize = 'large';

  constructor(private userRoutes: Router) {}

  create_user() {
    console.log('khoacheck user...');
    this.userRoutes.navigate(['/welcome/user/create']);
  }

  list_users() {
    this.userRoutes.navigate(['/welcome/user/list']);
  }
}
