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
import { ValueGetterParams } from 'ag-grid-community';
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
  product_code: string = '';
  qtyRequest: number = 1;
  // qtyOrder: number = 1;
  columnDefs: ColDef[] = [
    // {
    //   headerName: 'Công Đoạn',
    //   field: 'process',
    //   width: 150,
    //   filter: CheckboxFilterComponent,
    //   sortable: true,

    // },
    {
      headerName: 'STT',
      width: 60,
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    {
      headerName: 'Loại NVL',
      field: 'custom_mode',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },

    {
      headerName: 'Mã NVL',
      field: 'material_code',
      width: 150
    },
    {
      headerName: 'Tên NVL',
      field: 'material_name',
      flex: 1
    },
    {
      headerName: 'ĐVT',
      field: 'eng_unit',
      width: 100
    },
    {
      headerName: 'SL Yêu Cầu',
      field: 'qtyOrder',
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




    setTimeout(() => {
      this.getZCodeData();
    }, 0);


  }


  getUserInfor(): void {
    this.AuthService.getUserInfobyToken();
    this.userName = this.AuthService.userName;
    // console.log(this.AuthService.role);
    // console.log(this.AuthService.permissions);
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

    // call API lấy data từ database
    this.MfMaterialService.getDataPu(payload).subscribe(res => {
      
      if (res.message == "success") {
        this.prepareMaterialRequestData(res.data[0].design_number)
        this.PopupService.success("Lấy dữ liệu thành công");
        

      } else {
        this.PopupService.error(res.text);
      }
    });
  }



  prepareMaterialRequestData(design_number: string) {

      this.product_code = design_number;

    this.MfMaterialService.prepareMaterialRequestData(design_number).subscribe(res => {
      // console.log(res);
      this.rowData = res.data.map((item: any) => ({
        ...item,
        qtyOrder: (item.norm_seov * this.qtyRequest)
      }));
    });



  }


  getZCodeData() {
    const zCode = this.searchForm.get('zCode')?.value;
    // call API lấy data từ database
    this.MfMaterialService.getZCodeData().subscribe(res => {
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
      productionNumber: this.product_code,
      requestDate: raw.date ? dayjs(raw.date).format('YYYY-MM-DDTHH:mm:ss') : null,
      zCodes: raw.zCode,
      remark: raw.remark,
      details: this.rowData,
      createdBy: this.userName,
      qtyRequest: this.qtyRequest
    };
    console.log(payload)

    this.MfMaterialService.createOrder(payload).subscribe(res => {
      if (res.code === 200) {
        console.log(res)
        this.PopupService.success('Tạo order thành công!');
        this.reload();
      } else {
        this.PopupService.success('Có lỗi xảy ra vui lòng thử lại!');
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
    this.gridApi.destroyFilter('custom_mode');

  }



  addItem() {
    // console.log('thêm Item')
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


  onEnter(value: number) {
    this.rowData = this.rowData.map((item: any) => ({
      ...item,
      qtyOrder: (item.norm_seov * value)
    }))
  }


  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
  }
}
