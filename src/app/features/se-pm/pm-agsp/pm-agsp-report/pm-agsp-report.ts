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
// import { SePuService } from '../../se-pu.service';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ValueGetterParams, ColDef } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community';
import { PopupService } from '../../../../shared/service/popup.service';
import { CheckboxFilterComponent } from '../../../../shared/ArGrid/CheckboxFilterComponent';

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
  reportname: string = '';
  columnDefs15 = [
    {
      headerName: 'STT',
      width: 60,
      pinned: 'left',
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    { field: 'item_code', filter: true, sortable: true, width: 150, headerName: 'Mã NVL' },
    { field: 'item_namev', headerName: 'Tên NVL' },
    { field: 'cfr_unit', width: 100, headerName: 'DVT' },
    { field: 'tondau_5', width: 150, headerName: 'Tồn kho đầu kỳ' },
    { field: 'qty_nhap_6', width: 150, headerName: 'Nhập trong kỳ' },
    { field: 'qty_nhap_7', width: 150, headerName: 'Nhập trong kỳ khác' },
    { field: 'qty_xuat_8', width: 150, headerName: 'Tái xuất' },
    { field: 'qty_xuat_9', width: 150, headerName: 'Chuyển đổi MDSD' },
    { field: 'qty_xuat_10', width: 150, headerName: 'Xuất kho SX' },
    { field: 'qty_xuat_11', width: 150, headerName: 'Xuất kho khác' },
    { field: 'toncuoi', width: 150, headerName: 'Tồn cuối kỳ' },
    { field: 'scrossqty_nhap', filter: CheckboxFilterComponent, width: 150, headerName: 'Nhập trong kỳ(E11,E15)' },
    {
      field: 'difference', filter: CheckboxFilterComponent, width: 150, headerName: 'Difference',
      valueGetter: (params: ValueGetterParams) => {
        const qtyNhap = Number(params.data?.qty_nhap_6 ?? 0);
        const crossNhap = Number(params.data?.scrossqty_nhap ?? 0);
        return qtyNhap - crossNhap;
      }
    },
    { field: 'cross_nhap_gscm', width: 150, headerName: 'Nhập từ GSCM' },
    {
      field: 'difference', filter: CheckboxFilterComponent, width: 150, headerName: 'DifferenceGSCM',
      valueGetter: (params: ValueGetterParams) => {
        const qtyNhap = Number(params.data?.qty_nhap_6 ?? 0);
        const crossNhapgscm = Number(params.data?.cross_nhap_gscm ?? 0);
        return qtyNhap - crossNhapgscm;
      }
    },
    { field: 'cross_toncuoi', width: 150, headerName: 'Tồn cuối kỳ (Cross)' },
    {
      field: 'difference', filter: CheckboxFilterComponent, width: 150, headerName: 'DifferenceIvt',
      valueGetter: (params: ValueGetterParams) => {
        const qtyIvt = Number(params.data?.toncuoi ?? 0);
        const crossIvt = Number(params.data?.cross_toncuoi ?? 0);
        return qtyIvt - crossIvt;
      }
    }




  ];

  columnDefs15a = [
    {
      headerName: 'STT',
      width: 60,
      pinned: 'left',
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    { field: 'item_code', filter: true, sortable: true, width: 150, headerName: 'Mã NVL' },
    { field: 'item_namev', headerName: 'Tên NVL' },
    { field: 'cfr_unit', width: 100, headerName: 'DVT' },
    { field: 'tondau_5', width: 150, headerName: 'Tồn đầu kỳ' },
    { field: 'qty_nhap_6', width: 150, headerName: 'Nhập từ SX' },
    { field: 'qty_nhap_7', width: 150, headerName: 'Tái nhập kho' },
    { field: 'qty_xuat_8', width: 150, headerName: 'Chuyển đổi MDSD' },
    { field: 'qty_xuat_9', width: 150, headerName: 'Sản phẩm xuất khẩu' },
    { field: 'qty_xuat_10', width: 150, headerName: 'Xuất kho khác' },
    { field: 'toncuoi', width: 150, headerName: 'Tồn cuối kỳ' },
    { field: 'crossqty_xuat', width: 150, headerName: 'Xuất trong kỳ(E42)' },
    {
      field: 'difference', filter: CheckboxFilterComponent, width: 150, headerName: 'Difference',
      valueGetter: (params: ValueGetterParams) => {
        const qtyNhap = Number(params.data?.qty_nhap_7 ?? 0);
        const crossXuat = Number(params.data?.crossqty_xuat ?? 0);
        return qtyNhap - crossXuat;
      }
    },
    { field: 'crossqty_xuat_fgpm', width: 150, headerName: 'Xuất từ FGPM' },
     {
      field: 'difference', filter: CheckboxFilterComponent, width: 150, headerName: 'Difference',
      valueGetter: (params: ValueGetterParams) => {
        const qtyXuat = Number(params.data?.qty_xuat_9 ?? 0);
        const crossXuat = Number(params.data?.crossqty_xuat_fgpm ?? 0);
        return qtyXuat - crossXuat;
      }
    },
    { field: 'cross_toncuoi', width: 150, headerName: 'Tồn cuối kỳ (Cross)' },
    {
      field: 'difference', filter: CheckboxFilterComponent, width: 150, headerName: 'DifferenceIvt',
      valueGetter: (params: ValueGetterParams) => {
        const qtyIvt = Number(params.data?.toncuoi ?? 0);
        const crossIvt = Number(params.data?.cross_toncuoi ?? 0);
        return qtyIvt - crossIvt;
      }
    }

  ];


  columnDefs16 = [
    {
      headerName: 'STT',
      width: 60,
      pinned: 'left',
      valueGetter: (params: ValueGetterParams) =>
        (params.node?.rowIndex ?? 0) + 1
    },
    { field: 'item_code', filter: true, sortable: true, width: 150 },
    { field: 'item_namee' },
    { field: 'cfr_unit', width: 100 },
    { field: 'material_code', width: 150, filter: true, sortable: true },
    { field: 'material_name', width: 150 },
    { field: 'm_unit', width: 150 },
    { field: 'prd_code', width: 150, filter: true },
    { field: 'norm_seov', width: 150 },
    { field: 'tp_nhap_trong_ky', width: 150 },
    { field: 'tong_nvl_xuat_trong_ky', width: 150 },
    { field: 'nvl_sudung_dm', width: 150 },
    { field: 'tong_nvl_sd_dm', width: 150 },
    { field: 'ty_le_nvl_bom', width: 150 },
    { field: 'nvl_thucte_sd', width: 150 },
    { field: 'fn', width: 150 }


  ];

  // khi click vào row nào thì select row đó
  selectedRow: any = null;
  onRowClick(event: any) {
    this.selectedRow = event.data;
  }



  gridApi: any;

  constructor( private fb: FormBuilder, private PopupService: PopupService) { }
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
    // this.sePuService.getData(payload).subscribe(res => {
    //   console.log(res);
    //   this.gridApi.setGridOption('rowData', []);
    //   this.gridApi.setGridOption('rowData', res.data);
    // });
  }




}
