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
  selector: 'menu-machine',
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
  templateUrl: './machine-menu.html',
  styleUrls: ['./machine-menu.css']
})
export class MenuMachineComponent {
  size: NzButtonSize = 'large';

  constructor(private userRoutes: Router) { }

  create_machine() {
    console.log('create_machine');
    this.userRoutes.navigate(['/welcome/machine/create-machine']);
  }

  list_machines() {
    console.log('list_machines');
    this.userRoutes.navigate(['/welcome/machine/machine-managerment']);
  }
}
