import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
// import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PopupService } from '../../../../shared/service/popup.service';
import { CheckboxFilterComponent } from '../../../../shared/ArGrid/CheckboxFilterComponent';
import dayjs from 'dayjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MfMaterialService } from '../mf-material.service';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { number } from 'echarts';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'app-mf-material-request',
  imports: [
    AgGridAngular,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule,
    NzIconModule,
    CommonModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    NzSpaceModule

  ],
  templateUrl: './mf-material-request-detail.html',
  styleUrl: './mf-material-request-detail.css',
})
export class MfMaterialRequestDetailComponent {
  userName: String = ''
  searchForm!: FormGroup;
  rvForm!: FormGroup;
  detailform!: FormGroup;
  removeSub = false;
  removePacking = false;
  rowData: any[] = [];
  zCode: { production_number: string; registered_at: any }[] = [];
  remark: string = '';
  columnDefs: ColDef[] = [
    {
      headerName: 'Công Đoạn',
      field: 'process',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Loại NVL',
      field: 'materialType',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Mã NVL',
      field: 'itemCode',
      width: 150
    },
    {
      headerName: 'Tên NVL',
      field: 'itemName',
      flex: 1
    },
    {
      headerName: 'ĐVT',
      field: 'unit',
      width: 100
    },
    {
      headerName: 'SL Yêu Cầu',
      field: 'requestQty',
      width: 140,
      editable: true,
    },
        {
      headerName: 'SL Xuất',
      field: 'requestQty',
      width: 140,
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellStyle: {
        backgroundColor: '#fffbe6'
      }
    },
    {
      headerName: 'Ghi Chú',
      field: 'remark',
      flex: 1,
      editable: true,
      cellStyle: {
        backgroundColor: '#fffbe6'
      }
    }
  ];

  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }

  gridApi: any;
  rowSelection: RowSelectionOptions = {
    mode: 'multiRow',
    checkboxes: true,
    headerCheckbox: true
  };

  constructor( private fb: FormBuilder, private PopupService: PopupService, private AuthService: AuthService) { }
  ngOnInit() {
    this.getUserInfor();

    this.searchForm = this.fb.group({
      department: [null, Validators.required],
      date: [new Date()],
      remark: [null],
      zCode: [null, Validators.required],
    });

    this.rvForm = this.fb.group({
      removeSub: [false],
      removePacking: [false]
    });


    this.zCode = [
      {
        production_number: 'Z001',
        registered_at: '2026-06-18'
      },
      {
        production_number: 'Z002',
        registered_at: '2026-06-19'
      }
    ];


    this.rowData = [
      {
        itemCode: 'MAT0001',
        itemName: 'Optical Fiber G652D',
        unit: 'M',
        requestQty: 5000,
        stock_qty: 12000,
        materialType: 'SUB',
        remark: '',
        process: 'ABCD',
        status: 'true'

      },
      {
        itemCode: 'MAT0002',
        itemName: 'Connector SC/APC',
        unit: 'PCS',
        requestQty: 200,
        stock_qty: 1500,
        materialType: 'MAIN',
        remark: '',
        process: 'ADEF',
        status: 'true'
      },
      {
        itemCode: 'MAT0003',
        itemName: 'Heat Shrink Tube 40mm',
        unit: 'PCS',
        requestQty: 1000,
        stock_qty: 3500,
        materialType: 'SUB',
        remark: '',
        process: 'BCCCC',
        status: 'true'
      },
      {
        itemCode: 'MAT0004',
        itemName: 'PVC Jacket Black',
        unit: 'KG',
        requestQty: 250,
        stock_qty: 800,
        materialType: 'SUB',
        remark: '',
        process: 'BDDD',
        status: 'true'
      },
      {
        itemCode: 'MAT0005',
        itemName: 'Steel Wire 1.2mm',
        unit: 'KG',
        requestQty: 100,
        stock_qty: 450,
        materialType: 'MAIN',
        remark: '',
        process: 'BDDD',
        status: 'true'
      }
    ];


  }


  getUserInfor(): void {
    this.AuthService.getUserInfobyToken();
    this.userName = this.AuthService.userName;
    console.log(this.AuthService.role);
    console.log(this.AuthService.permissions);
  }


  saveData() {

  }





  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.rowData);
  }

  Cancel() {

  }












}
