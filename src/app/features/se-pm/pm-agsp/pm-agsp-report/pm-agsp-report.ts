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
  selector: 'app-pm-agsp-report',
  imports: [
    // AgGridAngular,
     NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule, NzModalModule
  ],
  templateUrl: './pm-agsp-report.html',
  styleUrl: './pm-agsp-report.css',
})
export class sePmAgspReportComponent {
  searchForm!: FormGroup;
  detailform!: FormGroup;
  rowData: any[] = [];
  columnDefs: any[] = [];
  reportname: string = '';




}
