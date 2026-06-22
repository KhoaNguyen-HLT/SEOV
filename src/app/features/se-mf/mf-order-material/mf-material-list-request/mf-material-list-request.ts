import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
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
import { ActionCellComponent } from '../../../../shared/components/action-cell/action-cell';
import { Router } from '@angular/router';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'app-mf-material-list-request',
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
  templateUrl: './mf-material-list-request.html',
  styleUrl: './mf-material-list-request.css',
})
export class MfMaterialRequestListComponent {
  userName: String = ''
  searchForm!: FormGroup;
  detailform!: FormGroup;
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    {
      headerName: 'Số Phiếu',
      field: 'request_no',
      width: 200,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Phòng ban YC',
      field: 'department',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Trạng Thái',
      field: 'status',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Người Tạo',
      field: 'created_by',
      width: 150,
      filter: CheckboxFilterComponent,
      sortable: true,

    },
    {
      headerName: 'Date',
      field: 'request_date',
      width: 150
    },
    {
      headerName: 'Ngày Tạo',
      field: 'created_at',
    },

    {
      headerName: 'Ghi Chú',
      field: 'remark',
      flex: 1,
      editable: true,
    }
    ,
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: ActionCellComponent,
      width: 100,
      autoHeight: true,
      cellRendererParams: {
        showOpen: true,
        showView: false,
        showEdit: false,
        showDelete: false
      }
    }
  ];



  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }

  gridApi: any;
  // rowSelection: RowSelectionOptions = {
  //   mode: 'multiRow',
  //   checkboxes: true,
  //   headerCheckbox: true
  // };

  constructor(private MfMaterialService: MfMaterialService, private fb: FormBuilder, private PopupService: PopupService, private AuthService: AuthService, private Router: Router) { }
  ngOnInit() {
    this.getUserInfor();

    this.searchForm = this.fb.group({
      department: [null, Validators.required],
      fromDate: [new Date()],
      toDate: [new Date()],
    });


  }


  getUserInfor(): void {
    this.AuthService.getUserInfobyToken();
    this.userName = this.AuthService.userName;
    console.log(this.AuthService.role);
    console.log(this.AuthService.permissions);
  }


  getData() {
    const raw = this.searchForm.value;
    if (!raw.department) {
      this.PopupService.error('Vui lòng chọn phòng ban!');
      return;
    }


    const payload = {
      department: raw.department || '',
      fromDate: raw.fromDate ? dayjs(raw.fromDate).format('YYYY-MM-DD') : null,
      toDate: raw.toDate ? dayjs(raw.toDate).format('YYYY-MM-DD') : null
    };

    console.log(payload);
    // call API lấy data từ database
    this.MfMaterialService.getMaterialRequestData(payload).subscribe(res => {
      console.log(res)
      if (res.message == "success") {
        this.PopupService.success("Loading Data");
        this.rowData = res.data
        this.gridApi.setGridOption('rowData', this.rowData);
      }
    });
  }



  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.rowData);
  }



  onOpen(row: any) {
    console.log('VIEW:', row);
    // TODO: mở modal xem chi tiết
    debugger
    this.Router.navigate([
      '/welcome',
      'mf-order-material',
      'mf-material-request-detail'
    ],{
    queryParams: {
      requestNo: row.request_no
    }
  });




  }
















}
