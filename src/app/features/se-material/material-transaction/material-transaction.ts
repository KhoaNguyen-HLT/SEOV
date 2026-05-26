import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  Validators,
  FormsModule,
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { PopupService } from '../../../shared/service/popup.service';

import { materialService } from '../se-material.service';

import dayjs from 'dayjs';

@Component({
  selector: 'app-material-transaction',
  standalone: true,
  imports: [FormsModule,
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
    NzDividerModule, NzGridModule
  ],
  templateUrl: './material-transaction.html',
  styleUrls: ['./material-transaction.css']
})
export class MaterialTransactionComponent {
  searchForm!: FormGroup;
  size: NzButtonSize = 'large';
  mr_code:string = '';
  materialRequests: any[] = [];
  loading = false;
  creating = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private materialService: materialService,
    private popupService: PopupService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.handleQueryParams();
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      flowName: [null],
      flowCode: [null],
      transactionType: [null],
      request_no: [null],
      date: [dayjs().startOf('month').toDate()],
      scanInput: ['']
    });
  }

  private handleQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const flowCode = params['flow_code'];
      if (!flowCode) {return}
      this.loadFlow(flowCode);
      this.getMaterialRequest(flowCode);
    });
  }

  private loadFlow(flowCode: string): void {
    this.materialService.getTransactionFlow(flowCode).subscribe({
      next: (res: any) => {
        const data = res.data;
        this.mr_code = data.mrCode;
        this.searchForm.patchValue({
          flowName: data.flowName,
          flowCode: data.flowCode,
          transactionType: data.transactionType
        });
      },
      error: () => {
        this.popupService.error('Không lấy được thông tin flow');
      }
    });
  }

  private getMaterialRequest(flowCode: string): void {
    this.loading = true;

    this.materialService.getMaterialRequest(flowCode).subscribe({
      next: (res: any) => {
        this.materialRequests = res.data ?? [];
        this.cdr.markForCheck();
      },
      error: () => {
        this.popupService.error('Không lấy được danh sách phiếu');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onScan(): void {
    const value = this.searchForm.get('scanInput')?.value?.trim();

    if (!value) return;

    console.log('scan:', value);

    this.searchForm.patchValue({
      scanInput: ''
    });
  }

  createRequestNo(): void {
    if (this.creating) return;
    const now = dayjs().format('YYYYMMDD_HHmmss');
    const data = {
      requestNo: `${this.mr_code}_${now}`,
      flowCode: this.searchForm.get('flowCode')?.value,
      flowName: this.searchForm.get('flowName')?.value,
      transactionType: this.searchForm.get('transactionType')?.value
    };

    this.creating = true;

    this.materialService.createMaterialRequest(data).subscribe({
      next: (res: any) => {
        if (res.message !== 'success') return;
        this.materialRequests = [
          res.data,
          ...this.materialRequests
        ];
        this.searchForm.patchValue({
          request_no: res.data.requestNo
        });
        this.popupService.success('Tạo phiếu thành công');
      },
      error: () => {
        this.popupService.error('Tạo phiếu thất bại');
      },
      complete: () => {
        this.creating = false;
      }
    });
  }
}