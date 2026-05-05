import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DeviceService } from '../device.service';
import { AgGridAngular } from 'ag-grid-angular';
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'list-device',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    AgGridAngular
  ],
  templateUrl: './list-device.html',
  styleUrls: ['./list-device.css']
})
export class ListDeviceComponent {
  rowData: any[] = [];
  columnDefs = [
    { field: 'machine_id', filter: true, sortable: true },
    { field: 'machine_name' },
    { field: 'model' },
    { field: 'ip_address' },
    { field: 'mac_address' },
    { field: 'type' },
    { field: 'status' },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: (params: any) => {
        return `
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        `;
      },
    },
  ];

  // defaultColDef = {
  //   sortable: true,
  //   filter: true,
  //   resizable: true
  // };

  // 👉 Export Excel
  exportExcel() {
    this.gridApi.exportDataAsExcel({
      fileName: 'danh-sach.xlsx',
      sheetName: 'Users'
    });
  }

  gridApi: any;

  constructor(private deviceService: DeviceService) { }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.deviceService.getDevices().subscribe((res) => {
      this.gridApi.setGridOption('rowData', res);
    });

    // bắt click trong grid
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('btn-edit')) {
        this.onEdit(event.data);
      }

      if (event.event.target.classList.contains('btn-delete')) {
        this.onDelete(event.data);
      }
    });
  }
  onEdit(row: any) {
    console.log('EDIT:', row);
    // ví dụ: mở form / modal
    // this.selectedUser = row;
  }
  onDelete(row: any) {
    console.log('DELETE:', row);

    // ví dụ: mở form / modal
    // this.selectedUser = row;
  }
}