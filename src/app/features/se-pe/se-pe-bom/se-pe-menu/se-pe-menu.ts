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
  ],
  templateUrl: './se-pe-menu.html',
  styleUrls: ['./se-pe-menu.css']
})
export class sePeMenuComponent {
  size: NzButtonSize = 'large';
  constructor(private router: Router) { }

  getData() {
    this.router.navigate(['/welcome/pe/se-pe-bom/se-pe-menu']);
  }

  openUpdateBom (){
    this.router.navigate(['/welcome/pe/se-pe-bom/se-pe-updateBom']);
  }

  // getMasterData() {
  //   this.router.navigate(['/welcome/pe/se-pe-cfr-getMasterData']);
  // }

  //   getReportData() {
  //   this.router.navigate(['/welcome/pe/se-pe-cfr-getReportData']);
  // }

}