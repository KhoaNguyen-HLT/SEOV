import { Component } from '@angular/core';
import { AppIconComponent } from '../../../../shared/components/icon/icon-component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
    AppIconComponent
  ],
  templateUrl: './mf-material-menu.html',
  styleUrls: ['./mf-material-menu.css']
})
export class MfMaterialMenuComponent {
  size: NzButtonSize = 'large';
  constructor(private router: Router) { }

  createRequest() {
    this.router.navigate(['/welcome/mf-order-material/mf-material-request']);
  }

  createRequestAn() {
    this.router.navigate(['/welcome/mf-order-material/mf-material-request-an']);
  }

  createRequestList() {
    this.router.navigate(['/welcome/mf-order-material/mf-material-list-request']);
  }

  aprovalRequest() {
    this.router.navigate(['/welcome/mf-order-material/mf-material-list-approve']);
  }

  hisRequest() {
    this.router.navigate(['/welcome/mf-order-material/mf-material-list-his']);
  }




}