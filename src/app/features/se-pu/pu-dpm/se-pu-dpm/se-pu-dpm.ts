import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-se-pu-dpm',
  standalone: true,
  imports: [FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
  ],
  templateUrl: './se-pu-dpm.html',
  styleUrls: ['./se-pu-dpm.css']
})
export class sePuDpmComponent {
  size: NzButtonSize = 'large';
  constructor(private router: Router) { }

  getData() {
    this.router.navigate(['/welcome/pu/se-pu-dpm-getData']);
  }

    getReportData() {
    this.router.navigate(['/welcome/pu/se-pu-dpm-getReportData']);
  }

}