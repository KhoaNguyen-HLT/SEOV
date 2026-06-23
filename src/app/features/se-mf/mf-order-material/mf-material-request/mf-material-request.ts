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
  templateUrl: './mf-material-request.html',
  styleUrl: './mf-material-request.css',
})
export class MfMaterialRequestComponent {
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

  constructor(private MfMaterialService: MfMaterialService, private fb: FormBuilder, private PopupService: PopupService, private AuthService: AuthService) { }
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
        item_name: 'Optical Fiber G652D',
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
        item_name: 'Connector SC/APC',
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
        item_name: 'Heat Shrink Tube 40mm',
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
        item_name: 'PVC Jacket Black',
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
        item_name: 'Steel Wire 1.2mm',
        unit: 'KG',
        requestQty: 100,
        stock_qty: 450,
        materialType: 'MAIN',
        remark: '',
        process: 'BDDD',
        status: 'true'
      }
    ];



    setTimeout(() => {
      this.getZCodeData();
    }, 0);


  }


  getUserInfor(): void {
    this.AuthService.getUserInfobyToken();
    this.userName = this.AuthService.userName;
    console.log(this.AuthService.role);
    console.log(this.AuthService.permissions);
  }


  getData() {
    if (!this.searchForm.get('zCode')?.value) {
      this.PopupService.error('Vui lòng chọn mã Z!');
      return;
    }
    const raw = this.searchForm.value;

    const payload = {
      department: raw.department || '',
      date: raw.date ? dayjs(raw.date).format('YYYY-MM-DD') : null,
      remark: raw.remark || null,
      zCode: raw.zCode
    };

    console.log(payload);
    // call API lấy data từ database
    this.MfMaterialService.getDataPu(payload).subscribe(res => {
      console.log(res);
      if (res.message == "success") {
        this.PopupService.success("Lấy dữ liệu thành công");
        this.getBomData(res.data[0].design_number)

      } else {
        this.PopupService.error(res.text);
      }
    });
  }



  getBomData(design_number: string) {
    console.log(design_number);
  }


  getZCodeData() {
    const zCode = this.searchForm.get('zCode')?.value;
    // call API lấy data từ database
    this.MfMaterialService.getZCodeData().subscribe(res => {
      console.log(res);
      this.zCode = res.data;
    });
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.rowData);
  }


  createOrder() {
    const raw = this.searchForm.value;

    if (!raw.department) {
      this.PopupService.error('Vui lòng chọn phòng ban!');
      return;
    }

    if (!raw.date) {
      this.PopupService.error('Vui lòng chọn ngày cần NVL!');
      return;
    }

    if (!raw.zCode || raw.zCode.length === 0) {
      this.PopupService.error('Vui lòng chọn mã Z cần order!');
      return;
    }

    if (!this.rowData || this.rowData.length === 0) {
      this.PopupService.error('Không có dữ liệu NVL để tạo order!');
      return;
    }

    const payload = {
      department: raw.department,
      requestDate: raw.date,
      zCodes: raw.zCode,
      remark: raw.remark,
      details: this.rowData,
      createdBy: this.userName
    };

    console.log('Payload tạo order:', payload);

    this.MfMaterialService.createOrder(payload).subscribe(res => {
      if (res.code === 200) {
        this.PopupService.success('Tạo order thành công!');
      }
    });
  };


  removeSelectedRows() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length === 0) {
      this.PopupService.error('Vui lòng chọn dữ liệu cần xóa!');
      return;
    }

    const filteredRows: any[] = [];

    this.gridApi.forEachNodeAfterFilterAndSort((node: any) => {
      filteredRows.push(node.data);
    });

    this.rowData = this.rowData.filter(row =>
      !(selectedRows.includes(row) && filteredRows.includes(row))
    );

    this.gridApi.setGridOption('rowData', this.rowData);
    // gọi lại để load filter option
    // this.gridApi.destroyFilter('process');
    // this.gridApi.destroyFilter('materialType');
    this.gridApi.setFilterModel(null);
  }



  addItem() {
    console.log('thêm Item')
    const newRow = {
      item_code: '',
      item_name: '',
      qty: 0,
      process: ''
    };

    this.gridApi.applyTransaction({
      add: [newRow]
    });
  }














}
