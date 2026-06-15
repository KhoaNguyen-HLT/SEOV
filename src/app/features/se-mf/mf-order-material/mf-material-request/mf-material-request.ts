import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ActionCellComponent } from '../../../../shared/components/action-cell/action-cell';
import dayjs from 'dayjs';
import { NzModalComponent } from "ng-zorro-antd/modal";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MfMaterialService } from '../mf-material.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'app-mf-material-request',
  imports: [
    AgGridAngular, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule, NzModalModule, CommonModule
  ],
  templateUrl: './mf-material-request.html',
  styleUrl: './mf-material-request.css',
})
export class MfMaterialRequestComponent {
  searchForm!: FormGroup;
  detailform!: FormGroup;
  rowData: any[] = [];
  zCode: { id: number; name: string }[] = [];
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

  constructor(private MfMaterialService: MfMaterialService, private fb: FormBuilder) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      department: [null],
      date: [new Date()],
      zCode: [null]
    });

    this.zCode = [
      { id: 1, name: 'Z001' },
      { id: 2, name: 'Z002' }
    ];
    

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
      department: raw.department ? raw.department : '',
      date: raw.date ? dayjs(raw.date).format('YYYY-MM-DD') : null
    };

    console.log(payload);
    // call API lấy data từ database
    this.MfMaterialService.getData(payload).subscribe(res => {
      console.log(res);
      this.gridApi.setGridOption('rowData', []);
      this.gridApi.setGridOption('rowData', res.data);
    });
  }


  getZCodeData() {
    const zCode = this.searchForm.get('zCode')?.value;
    // call API lấy data từ database
    this.MfMaterialService.getZCodeData(zCode).subscribe(res => {
      console.log(res);
      this.zCode = res.data;
    });
  }


  onGridReady(params: any) {
    const raw = this.searchForm.value;

    const payload = {
      ...raw,
      department: raw.department ? raw.department : '',
      date: raw.date
        ? dayjs(raw.date).format('YYYY-MM-DD')
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
