import { AndonService } from '../se-andon.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { Component, enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionCellComponent } from '../../../shared/components/action-cell/action-cell';
import dayjs from 'dayjs';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-se-andon-report',
  standalone: true,
  imports: [
    AgGridAngular, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule
  ],
  templateUrl: './se-andon-report.html',
  styleUrl: './se-andon-report.css',
})
export class seAndonReportComponent {
  searchForm!: FormGroup;
  rowData: any[] = [];
  columnDefs = [
    { field: 'line_name', filter: true, sortable: true },
    { field: 'error_stage' },
    { field: 'description' },
    { field: 'created_at', valueFormatter: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm:ss') : '' },
    { field: 'processing_at', valueFormatter: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm:ss') : '' },
    { field: 'completed_at', valueFormatter: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm:ss') : '' },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: ActionCellComponent,
      width: 100
    }
  ];


  // defaultColDef = {
  //   sortable: true,
  //   filter: true,
  //   resizable: true
  // };

  gridOptions = {
    context: {
      componentParent: this
    }
  };



  gridApi: any;

  constructor(private andonService: AndonService, private fb: FormBuilder) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      line: [null],
      status: [null],
      fromDate: [null],
      toDate: [null],
      keyword: [null]
    });
  }

  onSearch() {
    const raw = this.searchForm.value;

    const payload = {
      ...raw,
      fromDate: raw.fromDate
        ? dayjs(raw.fromDate).format('YYYY-MM-DD HH:mm:ss')
        : null,
      toDate: raw.toDate
        ? dayjs(raw.toDate).format('YYYY-MM-DD HH:mm:ss')
        : null
    };

    console.log(payload);
    // call API lấy data từ database
    this.andonService.andonGetData(payload).subscribe(res => {
      this.gridApi.setGridOption('rowData', res);
    });
  }

  exportExcel() {
    this.gridApi.exportDataAsExcel({
      fileName: 'danh-sach.xlsx',
      sheetName: 'Users'
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.andonService.andonGetData(params).subscribe((res) => {
      this.gridApi.setGridOption('rowData', res);
    });

    // bắt click trong grid
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('btn-view')) {
        this.onView(event.data);
      }
    });
  }

  onView(rowData: any) {
    console.log('VIEW:', rowData);
  }
}
