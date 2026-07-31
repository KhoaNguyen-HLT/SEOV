import { bootstrapApplication } from '@angular/platform-browser';
import { Component, enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import dayjs from 'dayjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ValueGetterParams, ColDef, ClientSideRowModelModule } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community';
import { PopupService } from '../../../../shared/service/popup.service';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { PmService } from '../../se-pm.service';
import { CheckboxFilterComponent } from '../../../../shared/ArGrid/CheckboxFilterComponent';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, CsvExportModule]);

@Component({
  standalone: true,
  selector: 'app-pm-agsp-shipping-plan',
  imports: [
    AgGridAngular,
    NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule, NzModalModule
  ],
  templateUrl: './pm-agsp-shipping-plan.html',
  styleUrl: './pm-agsp-shipping-plan.css',
})
export class sePmAgspShippingPlanComponent {
  searchForm!: FormGroup;
  detailform!: FormGroup;
  rowData: any[] = [];
  reportname: string = 'ShippingPlan';
  permission: any = '';

  columnDefs: ColDef[] = [
    {
      headerName: 'STT',
      width: 60,
      pinned: 'left',
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    {
      field: 'sp_no',
      headerName: 'Request No',
      filter: CheckboxFilterComponent,
      sortable: true,
      width: 150
    },
    {
      field: 'material_code',
      headerName: 'Mã NVL',
      filter: CheckboxFilterComponent,
      sortable: true,
      width: 150
    },

    {
      field: 'need_date',
      headerName: 'Nee Date',
      filter: CheckboxFilterComponent,
      sortable: true,
      width: 150
    },
    {
      field: 'supplier_code',
      headerName: 'Supplier',
      filter: CheckboxFilterComponent,
      sortable: true,
      width: 150
    },
    {
      field: 'delivery_qty',
      headerName: 'Qty',
      sortable: true,
      width: 150
    },

    {
      field: 'delivery_date',
      headerName: 'Exw Date',
      filter: true,
      sortable: true,
      width: 150
    },
    {
      field: 'delivery_date',
      headerName: 'Delivery Date',
      filter: CheckboxFilterComponent,
      sortable: true,
      width: 150
    },

    {
      field: 'created_at',
      headerName: 'created_at',
      sortable: true,
      valueFormatter: this.dateFormatter,
      width: 150
    },
        {
      field: 'qty_dsi',
      headerName: 'Using Date',
      sortable: true,
      width: 150
    },
      {
      field: 'tondau',
      headerName: 'Tồn Đầu',
      sortable: true,
      width: 150
    },
     {
      field: 'songay',
      headerName: 'Số Ngày',
      sortable: true,
      width: 150
    }


  ];

  constructor(private fb: FormBuilder, private PopupService: PopupService, private AuthService: AuthService, private PmService: PmService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      supplier: [null],
      date: [new Date(), Validators.required]
    });

    this.getUserInfo();
  }

  getUserInfo() {
    this.permission = this.AuthService.permissions;
    console.log(this.permission);

  }

  gridApi: any;

  onGridReady(params: any) {
    const raw = this.searchForm.value;

    const payload = {
      ...raw,
      supplier: raw.supplier ? raw.supplier : '',
      date: raw.date
        ? dayjs(raw.date).format('YYYY-MM-DD')
        : null
    };
    this.gridApi = params.api;
    // console.log(payload);
    // this.sePuService.getData(payload).subscribe((res) => {
    //   console.log(res);
    //   this.gridApi.setGridOption('rowData', res.data);
    // });
  }

  generateShippingPlan() {
    this.PmService.generateShippingPlan().subscribe((res) => {
      console.log(res);
    });
  }


  getShippingPlanData() {

    const raw = this.searchForm.value;

    const payload = {
      ...raw,
      supplier: raw.supplier ? raw.supplier : '',
      date: raw.date
        ? dayjs(raw.date).format('YYYY-MM-DD')
        : null
    };
    console.log(payload);
    this.PmService.getShippingPlanData(payload).subscribe((res) => {
      console.log(res);
      this.gridApi.setGridOption('rowData', res.data);

    });
  }



  exportExcel() {
    this.gridApi.exportDataAsCsv({
      fileName: this.reportname + '.csv',
      sheetName: 'report'
    });
  }


  dateFormatter(params: any) {
    if (!params.value) return '';

    const date = new Date(params.value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }




}
