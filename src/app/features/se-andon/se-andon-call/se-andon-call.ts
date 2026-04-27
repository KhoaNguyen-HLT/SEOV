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
      status: 'CALLING'
    };
    // gọi API call và lưu thông tin vào database
    this.andonService.callGroup(
      payload
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === 'success') {
          // thêm dữ liệu vào danh sách ANDonDataList với thời gian chờ và thời gian xử lý mặc định là 0
          const newItem = {
            ...res.data,
            waitingTime: 0,
            processingTime: 0
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

  updateProcessingStatus(item: any): void {
    this.andonService.updateProcessingStatus(item.id)
      .subscribe({
        next: (res: any) => {

          if (res.message == 'success') {
            // nếu chưa dùng websocket thì update local
            console.log(res)
            this.popup.success('Cập nhật trạng thái thành công');

          } else {
            this.popup.error('Cập nhật trạng thái thất bại');
          }

        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  updateDoneStatus(item: any): void {
    this.andonService.updateDoneStatus(item.id)
      .subscribe({
        next: (res: any) => {

          if (res.message == 'success') {
            // nếu chưa dùng websocket thì update local
            console.log(res)
            this.popup.success('Cập nhật trạng thái thành công');

          } else {
            this.popup.error('Cập nhật trạng thái thất bại');
          }

        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }



}