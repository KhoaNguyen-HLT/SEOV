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
import { NzModalComponent } from "ng-zorro-antd/modal";
import { NzModalModule } from 'ng-zorro-antd/modal';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'app-se-andon-report',
  imports: [
    AgGridAngular, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule,
    NzModalComponent, NzModalModule
  ],
  templateUrl: './se-andon-report.html',
  styleUrl: './se-andon-report.css',
})
export class seAndonReportComponent {
  searchForm!: FormGroup;
  detailform!: FormGroup;
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
      width: 100,
      autoHeight: true,
      cellRendererParams: {
        showView: true,
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

  constructor(private andonService: AndonService, private fb: FormBuilder) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      line: [null],
      status: [null],
      fromDate: [dayjs().startOf('month').toDate()],
      toDate: [dayjs().endOf('month').toDate()],
      keyword: [null]
    });

  }

  onSearch() {
    const raw = this.searchForm.value;

    const payload = {
      ...raw,
      line: raw.line ? raw.line : '',
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
      console.log(res);
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
    this.andonService.andonGetData({}).subscribe((res) => {
      this.gridApi.setGridOption('rowData', res);
    });
  }


  onView(row: any) {
    console.log('VIEW:', row);
    // TODO: mở modal xem chi tiết
    this.isVisibleDetail = true;
    this.selectedRow = row;

    this.detailform = this.fb.group({
      method: [row.method],
      line_name: [row.line_name],
      description: [row.description],
      new_device: [row.new_device],
      old_device: [row.old_device],
      replace_reason: [row.replace_reason],
      created_at: [dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss')]
    });

  }


  // modaldetail
  isVisibleDetail: boolean = false;
  handleCancel() {
    this.isVisibleDetail = false;
  }

}
