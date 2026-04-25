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
import { jwtDecode } from 'jwt-decode';
import { ChangeDetectorRef } from '@angular/core';
const token = localStorage.getItem('token');
export interface AndonItem {
  id: number;
  created_at: string;
  // thời gian chờ
  waitingTime: number;
  // thời gian xử lý
  processingTime: number;
  // trạng thái
  status: 'WAITING' | 'PROCESSING' | 'DONE';
  // thời điểm bắt đầu xử lý
  processingStartTime?: number;
}

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
    NzSpaceModule,
  ],
  templateUrl: './se-andon-call.html',
  styleUrls: ['./se-andon-call.css']
})


export class seAndonCallComponent implements OnInit {

  Line = '';
  ErrorStage = '';
  Description = '';
  userName = '';
  andonDataList: any[] = [];
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
    private andonService: AndonService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userName = decoded.sub; // hoặc field backend trả về
    }

    setInterval(() => {
      this.updateTime();
    }, 1000);
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
    const payload = {
      siteCode: this.Line,
      lineName: this.line_list.find((item) => item.siteCode === this.Line)?.lineName,
      errorStage: this.ErrorStage,
      description: this.Description,
      team: team,
      userCode: this.userName,
      status: 'Error'
    };
    console.log(payload);

    this.andonService.callGroup(
      payload
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === 'success') {
          // this.andonDataList.push(res.data);
          const newItem = {
            ...res.data, waitingTime: 0,
            processingTime: 0,
            status: 'WAITING'
          };
          this.andonDataList = [...this.andonDataList, newItem];
          console.log(this.andonDataList);
          this.cd.detectChanges();
          this.popup.success('Báo lỗi thành công');
        } else {
          this.popup.error('Gọi nhóm thất bại');
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })


  }

  // tính toán thời gian chờ từ khi bấm gọi đến hiện tại
  updateTime() {
    const now = Date.now();

    this.andonDataList = this.andonDataList.map(item => {

      // ⏳ WAITING
      if (item.status === 'WAITING') {
        const created = new Date(item.created_at).getTime();
        this.cd.detectChanges();
        return {
          ...item,
          waitingTime: Math.floor((now - created) / 1000)
        };
      }

      // 🔧 PROCESSING
      if (item.status === 'PROCESSING' && item.processingStartTime) {
        this.cd.detectChanges();
        return {
          ...item,
          processingTime: Math.floor((now - item.processingStartTime) / 1000)
        };
      }

      return item;
    });
  }

  handleProcess(item: AndonItem) {
    const now = Date.now();
    this.andonService.updateProcessingStatus(
      item.id,
      'PROCESSING'
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === 'success') {
          // this.andonDataList.push(res.data);
          const newItem = {
            ...res.data, waitingTime: 0,
            processingTime: 0,
            status: 'WAITING'
          };
          this.andonDataList = [...this.andonDataList, newItem];
          console.log(this.andonDataList);
          this.cd.detectChanges();
          this.popup.success('Đã cập nhật trạng thái đang xử lý');
        } else {
          this.popup.error('Có lỗi xảy ra vui lòng thử lại');
        }
      }
    });

    this.andonDataList = this.andonDataList.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          status: 'PROCESSING',
          processingStartTime: now
        };
      }
      return i;
    });
  }

  handleDone(item: AndonItem) {
    this.andonDataList = this.andonDataList.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          status: 'DONE'
        };
      }
      return i;
    });
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

  Action(item: any) {
    console.log(item);
    this.openModal();
  }


}