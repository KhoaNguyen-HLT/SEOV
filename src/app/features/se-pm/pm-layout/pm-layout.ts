import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


interface WarehouseRack {
  id: string;
  name: string;
  status: 'AVAILABLE' | 'WARNING' | 'FULL';
}

interface WarehouseZone {
  id: number;
  name: string;
  description: string;
  racks: WarehouseRack[];
}

@Component({
  selector: 'app-pm-layout',
  standalone: true,
  imports: [FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
    CommonModule
  ],
  templateUrl: './pm-layout.html',
  styleUrls: ['./pm-layout.css']
})
export class PmLayoutComponent {
  size: NzButtonSize = 'large';
  constructor(private router: Router) { }

  zones: WarehouseZone[] = [
    {
      id: 1,
      name: 'Khu vực 1',
      description: 'Khu vực chứa nguyên vật liệu chính',
      racks: [
        { id: 'R1-01', name: 'Rack 01', status: 'AVAILABLE' },
        { id: 'R1-02', name: 'Rack 02', status: 'WARNING' },
        { id: 'R1-03', name: 'Rack 03', status: 'FULL' },
        { id: 'R1-04', name: 'Rack 04', status: 'AVAILABLE' },
        { id: 'R1-05', name: 'Rack 05', status: 'AVAILABLE' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-01', name: 'Rack 01', status: 'AVAILABLE' },
        { id: 'R1-02', name: 'Rack 02', status: 'WARNING' },
        { id: 'R1-03', name: 'Rack 03', status: 'FULL' },
        { id: 'R1-04', name: 'Rack 04', status: 'AVAILABLE' },
        { id: 'R1-05', name: 'Rack 05', status: 'AVAILABLE' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-02', name: 'Rack 02', status: 'WARNING' },
        { id: 'R1-03', name: 'Rack 03', status: 'FULL' },
        { id: 'R1-04', name: 'Rack 04', status: 'AVAILABLE' },
        { id: 'R1-05', name: 'Rack 05', status: 'AVAILABLE' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' },
        { id: 'R1-06', name: 'Rack 06', status: 'WARNING' }
      ]
    },
    {
      id: 2,
      name: 'Khu vực 2',
      description: 'Khu vực chứa bao bì và vật tư phụ',
      racks: [
        { id: 'R2-01', name: 'Rack 01', status: 'FULL' },
        { id: 'R2-02', name: 'Rack 02', status: 'AVAILABLE' },
        { id: 'R2-03', name: 'Rack 03', status: 'AVAILABLE' },
        { id: 'R2-04', name: 'Rack 04', status: 'WARNING' }
      ]
    },
    {
      id: 3,
      name: 'Khu vực 3',
      description: 'Khu vực chờ xuất và hàng trả về',
      racks: [
        { id: 'R3-01', name: 'Rack 01', status: 'WARNING' },
        { id: 'R3-02', name: 'Rack 02', status: 'FULL' },
        { id: 'R3-03', name: 'Rack 03', status: 'AVAILABLE' },
        { id: 'R3-04', name: 'Rack 04', status: 'AVAILABLE' },
        { id: 'R3-05', name: 'Rack 05', status: 'FULL' }
      ]
    }
  ];

  selectedZone: WarehouseZone = this.zones[0];
  selectedRack: WarehouseRack | null = null;

  selectZone(zone: WarehouseZone): void {
    this.selectedZone = zone;
    this.selectedRack = null;
  }

  selectRack(rack: WarehouseRack): void {
    this.selectedRack = rack;
    console.log(`Selected Rack: ${rack.name}, Status: ${rack.status}`);
  }

  getStatusText(status: WarehouseRack['status']): string {
    switch (status) {
      case 'AVAILABLE':
        return 'Còn chỗ';
      case 'WARNING':
        return 'Gần đầy';
      case 'FULL':
        return 'Đã đầy';
    }
  }

}