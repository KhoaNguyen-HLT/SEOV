import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule, ColDef, RowSelectionOptions, ValueGetterParams, SelectionChangedEvent, GridReadyEvent } from 'ag-grid-community';
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
// import { ModuleRegistry } from 'ag-grid-community';
// import { CellSelectionModule } from 'ag-grid-enterprise';


ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'app-mf-material-request-an',
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
  templateUrl: './mf-material-request-an.html',
  styleUrl: './mf-material-request-an.css',
})
export class MfMaterialRequestAnComponent {
  userName1: String = ''
  searchForm!: FormGroup;
  rvForm!: FormGroup;
  productForm!: FormGroup;
  detailform!: FormGroup;
  removeSub = false;
  removePacking = false;
  Consumptions: any[] = [];
  rowData: any[] = [];
  productRowData: any[] = [];
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
      field: 'customMode',
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
      flex: 1,
    },
    {
      headerName: 'ĐVT',
      field: 'unit',
      width: 100
    },
    {
      headerName: 'SL Yêu Cầu',
      field: 'qty',
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

  productColumn: ColDef[] = [
    {
      headerName: 'STT',
      width: 60,
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    {
      headerName: 'Mã TP',
      field: 'item_code',
      width: 150
    },
    {
      headerName: 'Tên TP',
      field: 'item_namee',
      width: 650
    },
    {
      headerName: 'Loại',
      field: 'type',
      width: 200
    },
    {
      headerName: 'ĐVT',
      field: 'unit',
      width: 100
    },
    {
      headerName: 'SL Yêu Cầu',
      field: 'qty',
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
            'qty',
            Number(input.value || 0)
          );
        });

        return input;
      }
    }
  ];

  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }

  gridApi: any;
  prGridApi: any;
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
      remark: [null]
    });

    this.rvForm = this.fb.group({
      removeSub: [false],
      removePacking: [false]
    });

    this.getProductData();

  }

  getUserInfor(): void {
    this.userName1 = this.AuthService.userName;
  }


  getProductData() {
    // call API lấy data từ database
    this.MfMaterialService.getProductData().subscribe(res => {
      console.log(res)
      this.Consumptions = res.data;
    });
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.rowData);
  }

  onPrGridReady(params: any) {
    this.prGridApi = params.api;
    // this.prGridApi.setGridOption('rowData', this.productRowData);
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


    if (!this.rowData || this.rowData.length === 0) {
      this.PopupService.error('Không có dữ liệu NVL để tạo order!');
      return;
    }

    const detailData = this.rowData.map(item => ({
      material_code: item.itemCode,
      eng_unit: item.unit,
      qtyOrder: item.qty,
      custom_mode: item.customMode,
      remark: item.remark
    }));

    const payload = {
      department: raw.department,
      productionNumber: this.product_code,
      requestDate: raw.date ? dayjs(raw.date).format('YYYY-MM-DDTHH:mm:ss') : null,
      zCodes: raw.zCode,
      remark: raw.remark,
      details: detailData,
      products: this.productRowData,
      createdBy: this.userName1,
      qtyRequest: this.qtyRequest
    };
    console.log(payload)

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
    this.gridApi.destroyFilter('customMode');

  }


  // Làm việc với bảng product

  removeProductRows() {
    const selectedRows = this.prGridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      this.PopupService.error('Vui lòng chọn dữ liệu cần xóa!');
      return;
    }

    const filteredRows: any[] = [];

    this.prGridApi.forEachNodeAfterFilterAndSort((node: any) => {
      filteredRows.push(node.data);
    });

    this.productRowData = this.productRowData.filter(row =>
      !(selectedRows.includes(row) && filteredRows.includes(row))
    );

    // this.prGridApi.setGridOption('rowData', this.productRowData);
    // gọi lại để load filter option
    // this.gridApi.destroyFilter('custom_mode');

  }

  addItem() {
    this.selectedPrIds = [];
    this.isUpdateModalVisible = true;
  }

  selectedPrIds = [] as string[];

  isUpdateModalVisible = false;
  isModalVisible = false;

  updateHandleCancel() {
    this.isUpdateModalVisible = false;
  }


  updateHandleOk(): void {
    const existingCodes = new Set(
      this.productRowData.map(item => item.item_code)
    );

    const newItems = this.Consumptions
      .filter(item =>
        this.selectedPrIds.includes(item.item_code)
      )
      .filter(item =>
        !existingCodes.has(item.item_code)
      )
      .map(item => ({
        item_code: item.item_code,
        item_namee: item.item_namee,
        type: item.type,
        unit: item.gscm_unit,
        qty: 0,
      }));

    this.productRowData = [
      ...this.productRowData,
      ...newItems
    ];

    this.selectedPrIds = [];
    this.isUpdateModalVisible = false;
  }

  handleOk(): void {
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }


  // get detail material infomation with product
  getMaterial() {
    console.log(this.productRowData);
    const products = this.productRowData.map(item => ({
      item_code: item.item_code,
      qty: item.qty
    }));

    console.log(products);

    this.MfMaterialService.getMaterial(products).subscribe(res => {
      if (res.code === 200) {
        console.log(res)
        this.rowData = res.data
        this.gridApi.setGridOption(
          'rowData',
          this.rowData
        );
      } else {
        console.log("Có lỗi xảy ra rồi")
      }
    });

  }


  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  }



}
