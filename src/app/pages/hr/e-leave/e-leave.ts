import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ✅ FIX
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-e-leave',
  standalone: true,
  imports: [
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,

  ],
  host: {
    ngSkipHydration: 'true',
  },
  templateUrl: './e-leave.html',
  styleUrls: ['./e-leave.css'],
  
})

export class ELeaveComponent {
  size: NzButtonSize = 'large';
}
