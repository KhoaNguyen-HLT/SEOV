import { bootstrapApplication } from '@angular/platform-browser';
import { Component, enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ActionCellComponent } from '../../../shared/components/action-cell/action-cell';
import dayjs from 'dayjs';
import { NzModalComponent } from "ng-zorro-antd/modal";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SePuService } from '../se-pu.service';

ModuleRegistry.registerModules([AllCommunityModule]);

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
  columnDefs = [
    { field: 'item_code', filter: true, sortable: true, width: 150 },
    { field: 'item_namev' },
    { field: 'cfr_unit', width: 100 },
    { field: 'tondau_5', width: 150 },
    { field: 'qty_nhap_6', width: 150 },
    { field: 'qty_nhap_7', width: 150 },
    { field: 'qty_xuat_8', width: 150 },
    { field: 'qty_xuat_9', width: 150 },
    { field: 'qty_xuat_10', width: 150 },
    { field: 'qty_xuat_11', width: 150 }



    // {
    //   headerName: 'Action',
    //   field: 'action',
    //   cellRenderer: ActionCellComponent,
    //   width: 100,
    //   autoHeight: true,
    //   cellRendererParams: {
    //     showView: true,
    //     showEdit: false,
    //     showDelete: false
    //   }
    // }
  ];

  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }



  gridApi: any;

  constructor(private sePuService: SePuService, private fb: FormBuilder) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      reportName: [null],
      month: [new Date()]
    });

  }

  // onSearch() {
  //   const raw = this.searchForm.value;

  //   const payload = {
  //     ...raw,
  //     reportName: raw.reportName ? raw.reportName : '',
  //     month: raw.month ? dayjs(raw.month).format('YYYY-MM') : null
  //   };

  //   console.log(payload);
  //   // call API lấy data từ database
  //   this.sePuService.getData(payload).subscribe(res => {
  //     console.log(res);
  //     this.gridApi.setGridOption('rowData', res.data);
  //   });
  // }

  getData() {
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



  exportExcel() {
    this.gridApi.exportDataAsExcel({
      fileName: 'danh-sach.xlsx',
      sheetName: 'Users'
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


}
