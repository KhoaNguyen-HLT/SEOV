import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { AndonService } from '../se-andon.service';
import { PopupService } from '../../../shared/service/popup.service';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'se-andon-call',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    FormsModule,
    NzSpaceModule
  ],
  templateUrl: './se-andon-call.html',
  styleUrls: ['./se-andon-call.css']
})
export class seAndonCallComponent implements OnInit {
  Line = '';
  ErrorStage = '';
  Description = '';
  line_list =
    [
      {
        "siteCode": "1",
        "lineName": "M102"
      },
      {
        "siteCode": "2",
        "lineName": "M103"
      },
      {
        "siteCode": "3",
        "lineName": "M104"
      }
    ]
  constructor(
    private fb: FormBuilder,
    private popup: PopupService,
    private andonService: AndonService
  ) {
  }

  ngOnInit(): void {
    this.getLines();
  }

  getLines(): void {
    // this.andonService.getLines().subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   }
    // });
    console.log(this.line_list)
  }

  callGroup(team: string): void {
    console.log(team);
    console.log(this.Line);
    console.log(this.ErrorStage);
    console.log(this.Description);
    if (this.Line === '') {
      this.popup.error('Vui lòng nhập Line');
      return;
    }
    if (this.ErrorStage === '') {
      this.popup.error('Vui lòng nhập công đoạn lỗi');
      return;
    }
    if (this.Description === '') {
      this.popup.error('Vui lòng nhập mô tả lỗi');
      return;
    }





  }

  // Logic popup
  isModalVisible = false;
  isRepairMethod = true;

  openModal(): void {
    this.isModalVisible = true;
    // Reset form logic
    this.isRepairMethod = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  toggleMethodForm(): void {
    this.isRepairMethod = this.isRepairMethod ? false : true;
  }

  // Logic xử lý form
  submitResolution(): void {
    if (this.isRepairMethod) {
      // Logic sửa chữa tại chỗ
      console.log("Sửa chữa tại chỗ");
    } else {
      // Logic thay thế thiết bị
      console.log("Thay thế thiết bị");
    }
    this.isModalVisible = false;
  }


}