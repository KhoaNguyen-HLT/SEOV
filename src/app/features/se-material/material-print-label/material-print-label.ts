import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxPrintModule } from 'ngx-print';
import { NzModalModule } from 'ng-zorro-antd/modal';
import dayjs from 'dayjs';
import { PopupService } from '../../../shared/service/popup.service';
import { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ActionCellComponent } from '../../../shared/components/action-cell/action-cell';
import { AgGridAngular } from 'ag-grid-angular';
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-material-print-label',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzInputNumberModule,
    NzButtonModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzSliderModule,
    NgxPrintModule,
    NzModalModule,
    AgGridAngular
  ],
  templateUrl: './material-print-label.html',
  styleUrls: ['./material-print-label.css'],
})
export class MaterialPrintLabelComponent {

  btn_save = false;
  btn_preview = false;
  rowData: any[] = [];
  generateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private PopupService: PopupService
  ) { }

  ngOnInit(): void {
    // this.labelForm = this.fb.group({
    //   materialName: ['', Validators.required],
    //   lotNo: ['', Validators.required],
    //   qty: [0],
    //   uom: ['PCS'],
    //   location: [''],
    //   labelCode: [''],
    //   printQty: [1]
    // });

    this.generateForm = this.fb.group({
      materialName: ['', Validators.required],
      totalQty: [0, Validators.required],
      labelQty: [1],
      dateTime: [dayjs().toDate()],
    });

  }


  generateLot(): void {
    if (this.generateForm.invalid) {
      Object.values(this.generateForm.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      this.PopupService.error("Vui lòng điền đẩy đủ thông tin");
      return;
    }

    const totalQty = Number(this.generateForm.value.totalQty);
    const labelQty = Number(this.generateForm.value.labelQty);

    if (!totalQty || totalQty <= 0) {
      this.generateForm.get('totalQty')?.markAsTouched();
      this.generateForm.get('totalQty')?.setErrors({ min: true });

      this.PopupService.error('Tổng số lượng phải lớn hơn 0');
      return;
    }

    const formValue = this.generateForm.getRawValue();
    const baseQty = Math.floor(totalQty / labelQty);
    const remainder = totalQty % labelQty;
    this.rowData = [];

    for (let i = 0; i < labelQty; i++) {
      const qty = i < remainder ? baseQty + 1 : baseQty;

      this.rowData.push({
        lotNo: `${this.generateForm.get('materialName')?.value}-${String(i + 1).padStart(3, '0')}`,
        materialName: formValue.materialName,
        qty: qty,
        date: dayjs(formValue.dateTime).format('YYYY-MM-DD'),
        boxNo: i + 1
      });
    }

    console.log(this.rowData);
    this.btn_save = true;

  }


  saveData() {
    console.log("Click Save")
    this.btn_preview = true;
  }





  previewLabel(): void {
    this.isVisible = true;
  }


  getQrUrl(lotNo: string): string {
    return `http://localhost:8081/seov/qrcode/genQrcode/${lotNo}`;
  }

  // get qrUrl(): string {
  //   return `http://localhost:8081/seov/qrcode/genQrcode/${this.label.lotNo}`;
  // }



  // Modal control
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  // hiển thị thông tin label trong table

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    resizable: true
  };

  columnDefs: ColDef[] = [
    { field: 'lotNo', filter: true, sortable: true },
    { field: 'materialName' },
    { field: 'qty' },
    { field: 'boxNo' },
    { field: 'date', valueFormatter: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm:ss') : '' },
  ];

}
