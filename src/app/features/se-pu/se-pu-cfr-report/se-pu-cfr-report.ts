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
import { SePuService } from '../se-pu.service';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ValueGetterParams, ColDef } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community';
import { PopupService } from '../../../shared/service/popup.service';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, CsvExportModule]);

@Component({
  standalone: true,
  selector: 'app-se-pu-report',
  imports: [
    AgGridAngular, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule, NzModalModule
  ],
  templateUrl: './se-pu-cfr-report.html',
  styleUrl: './se-pu-cfr-report.css',
})
export class sePuCfrReportComponent {
  searchForm!: FormGroup;
  detailform!: FormGroup;
  rowData: any[] = [];
  columnDefs: any[] = [];
  columnDefs15 = [
    {
      headerName: 'STT',
      width: 60,
      pinned: 'left',
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    { field: 'item_code', filter: true, sortable: true, width: 150 },
    { field: 'item_namev' },
    { field: 'cfr_unit', width: 100 },
    { field: 'tondau_5', width: 150 },
    { field: 'qty_nhap_6', width: 150 },
    { field: 'qty_nhap_7', width: 150 },
    { field: 'qty_xuat_8', width: 150 },
    { field: 'qty_xuat_9', width: 150 },
    { field: 'qty_xuat_10', width: 150 },
    { field: 'qty_xuat_11', width: 150 },
    { field: 'toncuoi', width: 150 }

  ];

  columnDefs15a = [
    {
      headerName: 'STT',
      width: 60,
      pinned: 'left',
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    { field: 'item_code', filter: true, sortable: true, width: 150 },
    { field: 'item_namev' },
    { field: 'cfr_unit', width: 100 },
    { field: 'tondau_5', width: 150 },
    { field: 'qty_nhap_6', width: 150 },
    { field: 'qty_nhap_7', width: 150 },
    { field: 'qty_xuat_8', width: 150 },
    { field: 'qty_xuat_9', width: 150 },
    { field: 'qty_xuat_10', width: 150 },
    { field: 'toncuoi', width: 150 }

  ];

  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }



  gridApi: any;

  constructor(private sePuService: SePuService, private fb: FormBuilder, private PopupService: PopupService) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      reportName: [null, Validators.required],
      month: [new Date(), Validators.required]
    });

  }


  getData() {

    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      this.PopupService.error("Vui lòng chọn các thông tin còn trống!")
      return;
    }
    const raw = this.searchForm.value;
    this.gridApi.setGridOption('rowData', []);
    const payload = {
      ...raw,
      reportName: raw.reportName ? raw.reportName : '',
      month: raw.month ? dayjs(raw.month).format('YYYY-MM') : null
    };

    console.log(payload);
    // call API lấy data từ database
    this.sePuService.getData(payload).subscribe(res => {
      console.log(res);
      this.gridApi.setGridOption('rowData', []);
      this.gridApi.setGridOption('rowData', res.data);
    });
  }


  updateOpenInventory() {

    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      this.PopupService.error("Vui lòng chọn các thông tin còn trống!")
      return;
    }

    const raw = this.searchForm.value;
    // const reportName = '15a'
    const reportName = raw.reportName ? raw.reportName : '';
    const month = raw.month ? dayjs(raw.month).format('YYYY-MM') : '';



    const data = {
      reportName,
      month
    };

    console.log(data);
    // call API lấy data từ database
    this.sePuService.updateOpenInventory(data).subscribe(res => {
      console.log(res);
    });
  }



  exportExcel() {
    this.gridApi.exportDataAsCsv({
      fileName: 'Report_15.csv',
      sheetName: 'report'
    });
  }
  onGridReady(params: any) {
    const raw = this.searchForm.value;

    const payload = {
      ...raw,
      reportName: raw.reportName ? raw.reportName : '',
      month: raw.month
        ? dayjs(raw.month).format('YYYY-MM')
        : null
    };
    this.gridApi = params.api;
    console.log(payload);
    // this.sePuService.getData(payload).subscribe((res) => {
    //   console.log(res);
    //   this.gridApi.setGridOption('rowData', res.data);
    // });
  }


  onReportChange(report: string) {
    if (report === '15') {
      this.columnDefs = this.columnDefs15;
      this.gridApi.setGridOption('rowData', []);
      console.log('15')
    } else if (report === '15a') {
      this.columnDefs = this.columnDefs15a;
      this.gridApi.setGridOption('rowData', []);
      console.log('15a')
    }
  }


}
