import { Component } from '@angular/core';
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
  flow_name: string = '';
  request_no: string = '';
  scanInput: string = '';
  flowCode: string = '';
  flowName: string = '';
  transactionType: string = '';


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: materialService,
    private PopupService: PopupService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      flowName: [null],
      flowCode: [null],
      transactionType: [null],
      request_no: [null],
      date: [dayjs().startOf('month').toDate()],
      scanInput: ['']
    });

    this.route.queryParams.subscribe(params => {
      const flowCode = params['flow_code'];
      if (flowCode) {
        this.loadFlow(flowCode);
      }

    });

  }

  loadFlow(flowCode: string) {
    this.materialService.getTransactionFlow(flowCode).subscribe((res: any) => {
      console.log(res);
      console.log(res.data.flowName);
      this.searchForm.patchValue({
        flowName: res.data.flowName,
        flowCode: res.data.flowCode,
        transactionType: res.data.transactionType
      });
    });
  }


  onScan(): void {

    const value = this.searchForm.get('scanInput')?.value;

    if (!value) {
      return;
    }

    console.log('scan:', value);

    /**
     * gọi API:
     * GET /material-lot/{value}
     */

    this.searchForm.patchValue({
      scanInput: ''
    });

  }


  materialRequests = [
    {
      id: 1,
      requestNo: 'MR_20260525_080001',
      status: 'OPEN'
    },
    {
      id: 2,
      requestNo: 'MR_20260525_083015',
      status: 'OPEN'
    },
    {
      id: 3,
      requestNo: 'MR_20260524_160210',
      status: 'IN_PROGRESS'
    },
    {
      id: 4,
      requestNo: 'MR_20260524_103500',
      status: 'DONE'
    }
  ];

  createRequestNo(): void {
    const now = dayjs().format('YYYYMMDD_HHmmss');
    const requestNo = `MR_${now}`;
    const data = {
      requestNo: requestNo,
      flowCode: this.searchForm.get('flowCode')?.value,
      flowName: this.searchForm.get('flowName')?.value,
      transactionType: this.searchForm.get('transactionType')?.value
    };
    console.log('create request no:', requestNo);

    this.materialService.createMaterialRequest(data).subscribe((res: any) => {
      if (res.message == 'success') {

        this.materialRequests = [
          res.data,
          ...this.materialRequests
        ];

        this.searchForm.patchValue({
          request_no: res.data.requestNo
        });
        this.PopupService.success('Tạo phiếu thành công');
      }

    });
  }


}