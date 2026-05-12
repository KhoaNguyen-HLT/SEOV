import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import dayjs from 'dayjs';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DeviceService } from '../device.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ActionCellComponent } from '../../../../shared/components/action-cell/action-cell';
import { PopupService } from '../../../../shared/service/popup.service';
import { NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import localeVi from '@angular/common/locales/vi';
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
  providers: [
    { provide: NZ_DATE_LOCALE, useValue: localeVi },
  ],
  templateUrl: './list-device.html',
  styleUrls: ['./list-device.css']
})
export class ListDeviceComponent {
  searchForm!: FormGroup;
  rowData: any[] = [];
  getRowId = (params: any) => params.data.id;
  columnDefs = [
    { field: 'location', filter: true, sortable: true },
    { field: 'code' },
    { field: 'serialNumber' },
    { field: 'supplier' },
    { field: 'fa' },
    { field: 'faCode' },
    { field: 'poNumber' },
    { field: 'kianNo' },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: ActionCellComponent,
      width: 100,
      autoHeight: true,
      cellRendererParams: {
        showView: false,
        showEdit: true,
        showDelete: true,
        // onView: (row: any) => this.onView(row),
        // onEdit: (row: any) => this.onEdit(row),
        // onDelete: (row: any) => this.onDelete(row)
      }
    }
  ];


  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }

  // defaultColDef = {
  //   sortable: true,
  //   filter: true,
  //   resizable: true
  // };

  // 👉 Export Excel

  gridApi: any;
  exportExcel() {
    this.gridApi.exportDataAsExcel({
      fileName: 'danh-sach.xlsx',
      sheetName: 'Users'
    });
  }


  constructor(private deviceService: DeviceService, private fb: FormBuilder, private popup: PopupService,) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      location: [''],
      code: [''],
      serialNumber: [''],
      supplier: ['']
    });

    // 👉 FIX ở đây
    this.searchForm = this.fb.group({
      location: [''],
      fromDate: [dayjs().startOf('month').toDate()],
      toDate: [dayjs().endOf('month').toDate()],
    });



  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onView(row: any) {
    console.log('VIEW:', row);
  }

  onEdit(row: any) {
    console.log('EDIT:', row);
    this.currentRow = row;
    this.editForm.patchValue(row);
    this.isEditModalVisible = true;
  }

  onDelete(row: any) {
    console.log('DELETE:', row);
    if (row.id) {
      this.deviceService.deleteDevice(row.id).subscribe((res: any) => {
        if (res.message == "success") {
          this.gridApi.applyTransaction({
            remove: [row]
          });
          this.popup.success("Xóa thiết bị thành công");
        }
        else {
          this.popup.error(res.message);
        }
      });
    }

  }


  isEditModalVisible = false;
  editForm!: FormGroup;
  currentRow: any;

  handleCancel() {
    this.isEditModalVisible = false;
  }
  handleOk() {
    if (this.editForm.invalid) return;

    const updated = {
      ...this.currentRow,
      ...this.editForm.value
    };

    console.log('UPDATED:', updated);

    // 👉 gọi API update
    this.deviceService.updateDevice(updated).subscribe((res: any) => {
      console.log('UPDATED:', res);
      if (res.message == "success") {

        this.gridApi.applyTransaction({
          update: [updated]
        });
        this.isEditModalVisible = false;
        this.popup.success("Cập nhật thiết bị thành công");
        // this.loadData();
      }
      else {
        this.popup.error(res.message);
        this.isEditModalVisible = false;
      }
    });

    this.isEditModalVisible = false;
  }


  // search

  onSearch() {
    const raw = this.searchForm.value;

    const payload = {
      ...raw,
      fromDate: raw.fromDate
        ? dayjs(raw.fromDate).format('YYYY-MM-DD')
        : null,
      toDate: raw.toDate
        ? dayjs(raw.toDate).format('YYYY-MM-DD')
        : null
    };

    console.log(payload);
    this.deviceService.getDevices(payload).subscribe((res) => {
      console.log(res);
      this.gridApi.setGridOption('rowData', res.data);
    });
  }

  PrintData(location: any) {

    this.deviceService.printData(location).subscribe(blob => {

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;
      a.download = 'form.xlsx';

      a.click();

      window.URL.revokeObjectURL(url);
    });
  }


}