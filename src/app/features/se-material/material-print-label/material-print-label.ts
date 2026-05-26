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
    NzModalModule
  ],
  templateUrl: './material-print-label.html',
  styleUrls: ['./material-print-label.css'],
})
export class MaterialPrintLabelComponent {

  labelForm!: FormGroup;
  constructor(
  private fb: FormBuilder
) {}

ngOnInit(): void {
  this.labelForm = this.fb.group({
    materialCode: ['', Validators.required],
    lotNo: ['', Validators.required],
    qty: [0],
    uom: ['PCS'],
    location: [''],
    labelCode: [''],
    printQty: [1]
  });
}



previewLabel(): void {

  const lotNo =
    this.labelForm.get('lotNo')?.value;

  this.labelForm.patchValue({
    labelCode: `LB_${lotNo}`
  });

}
 

  labels = [
  {
    materialCode: 'NVL001',
    lotNo: 'LOT001',
    qty: 100,
    uom: 'PCS',
    location: 'WH-A1'
  },
  {
    materialCode: 'NVL002',
    lotNo: 'LOT002',
    qty: 50,
    uom: 'PCS',
    location: 'WH-A2'
  }
];

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

}
