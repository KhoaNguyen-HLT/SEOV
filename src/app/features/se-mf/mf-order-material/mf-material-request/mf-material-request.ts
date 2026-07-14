import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule, ColDef, RowSelectionOptions ,ValueGetterParams, SelectionChangedEvent, GridReadyEvent} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PopupService } from '../../../../shared/service/popup.service';
import { CheckboxFilterComponent } from '../../../../shared/ArGrid/CheckboxFilterComponent';
import dayjs from 'dayjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MfMaterialService } from '../mf-material.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { AuthService } from '../../../../core/auth/service/auth.service';

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
    NzSpaceModule,
    FormsModule

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
  Consumptions: any[] = [];
  rowData: any[] = [];
  zCode: { production_number: string; registered_at: any }[] = [];
  remark: string = '';
  product_code: string = '';
  qtyRequest: number = 1;
  columnDefs: ColDef[] = [
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
      cellRenderer: (params: any) => {
        const input = document.createElement('input');

        input.type = 'number';
        input.value = params.value ?? 0;
        input.min = '0';

        input.style.width = '100%';
        input.style.height = '32px';
        input.style.padding = '0 8px';
        input.style.border = '1px solid #cdc7c7';
        input.style.borderRadius = '6px';
        input.style.background = '#fffbe6';
        input.style.outline = 'none';
        input.style.boxSizing = 'border-box';
        input.style.transition = 'all .2s';

        input.addEventListener('click', e => e.stopPropagation());

        input.addEventListener('focus', () => {
          input.style.borderColor = '#ffffff';
          input.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.2)';
        });

        input.addEventListener('blur', () => {
          input.style.borderColor = '#cdc7c7';
          input.style.boxShadow = 'none';

          params.node.setDataValue(
            'qtyOrder',
            Number(input.value || 0)
          );
        });

        return input;
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

    this.getConsumptionData();
    setTimeout(() => {
      this.getZCodeData();
    }, 0);


  }

  getUserInfor(): void {
    this.userName = this.AuthService.userName;
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

  getConsumptionData() {
    // call API lấy data từ database
    this.MfMaterialService.getConsumptionData().subscribe(res => {
      this.Consumptions = res.data;
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

    // if (!raw.zCode || raw.zCode.length === 0) {
    //   this.PopupService.error('Vui lòng chọn mã Z cần order!');
    //   return;
    // }

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
    // console.log(payload)

    this.MfMaterialService.createOrder(payload).subscribe(res => {
      if (res.code === 200) {
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
    this.selectedMtIds = [];
    this.isUpdateModalVisible = true;
  }

  selectedMt: any;
  selectedMtIds = [] as string[];

  isUpdateModalVisible = false;
  isModalVisible = false;

  updateHandleCancel() {
    this.isUpdateModalVisible = false;
  }


  updateHandleOk(): void {
    const existingCodes = new Set(
      this.rowData.map(item => item.material_code)
    );

    const newItems = this.Consumptions
      .filter(item =>
        this.selectedMtIds.includes(item.material_code)
      )
      .filter(item =>
        !existingCodes.has(item.material_code)
      )
      .map(item => ({
        material_code: item.material_code,
        material_name: item.vietnamese_name,
        custom_mode: item.custom_mode,
        eng_unit: item.gscm_eng,
        qtyOrder: 0,
        remark: ''
      }));

    this.rowData = [
      ...this.rowData,
      ...newItems
    ];

    this.selectedMtIds = [];
    this.isUpdateModalVisible = false;
  }



  handleOk(): void {
    this.isModalVisible = true;
  }


  handleCancel(): void {
    this.isModalVisible = false;
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
