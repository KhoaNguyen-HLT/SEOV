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
import { SePuService } from '../../se-pu.service';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ValueGetterParams, ColDef } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community';
import { PopupService } from '../../../../shared/service/popup.service';
import { CheckboxFilterComponent } from '../../../../shared/ArGrid/CheckboxFilterComponent';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, CsvExportModule]);

@Component({
  standalone: true,
  selector: 'app-se-pu-history',
  imports: [
    AgGridAngular, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule, NzModalModule
  ],
  templateUrl: './se-pu-cfr-history.html',
  styleUrl: './se-pu-cfr-history.css',
})
export class sePuCfrHisComponent {
  searchForm!: FormGroup;
  detailform!: FormGroup;
  rowData: any[] = [];
  // columnDefs: any[] = [];
  reportname: string = '';
  columnDefs: ColDef[] = [
    {
      headerName: 'STT',
      width: 60,
      pinned: 'left',
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    { field: 'document_type', sortable: true,filter: CheckboxFilterComponent ,width: 150, headerName: 'Document Type' },
    { field: 'report_type', headerName: 'Report Type', filter: CheckboxFilterComponent },
    { field: 'created_by', width: 100, headerName: 'User ID' },
    { field: 'name', width: 150, headerName: 'Username' },
    { field: 'month', width: 150, headerName: 'Month' },
    { field: 'datetime', width: 150, headerName: 'Datetime' },


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
      reportName: [null, Validators.required]
    });

  }


  getHisData() {

    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      this.PopupService.error("Vui lòng chọn các thông tin còn trống!")
      return;
    }
    const raw = this.searchForm.value;
    this.gridApi.setGridOption('rowData', []);
    const payload = {
      ...raw,
      reportName: raw.reportName ? raw.reportName : ''
    };

    console.log(payload);
    // call API lấy data từ database
    this.sePuService.getHisData(payload).subscribe(res => {
      console.log(res);
      this.gridApi.setGridOption('rowData', []);
      this.gridApi.setGridOption('rowData', res.data);
    });
  }




  exportExcel() {
    this.gridApi.exportDataAsCsv({
      fileName: this.reportname + '.csv',
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



}
