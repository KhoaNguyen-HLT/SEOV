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
import { BehaviorSubject, interval, map } from 'rxjs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ActivatedRoute, Router } from '@angular/router';


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
    NzRadioModule
  ],
  templateUrl: './se-andon-call.html',
  styleUrls: ['./se-andon-call.css']
})


export class seAndonCallComponent implements OnInit {
  doneForm!: FormGroup;
  timer$ = interval(1000);
  Line = '';
  ErrorStage = '';
  Description = '';
  userName = '';
  timerId: any;
  isLineModalVisible = false;
  andonDataList$ = new BehaviorSubject<any[]>([]);
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
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userName = decoded.sub; // hoặc field backend trả về
    }

    this.getLines();
    this.route.queryParams.subscribe(params => {
      this.Line = params['Line'];
      if (!this.Line) {
        this.isLineModalVisible = true; // 🔥 open modal
      }
    });

    this.doneForm = this.fb.group({
      method: ['repair'],
      repairNotes: [''],
      oldDevice: [''],
      newDevice: [''],
      oldStatus: ['NG'],
      replaceReason: ['']
    });

    this.startTimer();
  }

  confirmLine() {
    this.isLineModalVisible = false;
    console.log(this.Line);
    this.getDataPending(this.Line);
  }
  getLineName(): string {
    const item = this.line_list.find(x => x.siteCode === this.Line);
    return item ? item.lineName : this.Line;
  }

  ngAfterViewInit() {
    setInterval(() => {
    }, 1000);
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

  // gọi API vào bảng andon data để lấy thông tin các request
  getDataPending(siteCode: any) {
    this.andonService.getDataPending(siteCode).subscribe({
      next: (res: any) => {
        console.log(res);
        const newItems = res.data;

        setTimeout(() => {
          this.andonDataList$.next([
            ...this.andonDataList$.value,
            ...newItems   // 👈 spread mảng
          ]);
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

  callGroup(team: any): void {

    console.log(this.andonDataList$.value)
    const hasSameTeam = this.andonDataList$.value.some(
      (x: any) => x.team === Number(team)
    );

    if (hasSameTeam) {
      this.popup.error('Vui lòng xử lý các yêu cầu trước khi tạo yêu cầu mới');
      return;
    }

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
          // add thêm dữ liệu vào danh sách ANDonDataList
          const newItem = res.data;
          setTimeout(() => {
            this.andonDataList$.next([...this.andonDataList$.value, newItem]);
          });
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
            const updatedList = this.andonDataList$.value.map(x =>
              x.id === item.id
                ? {
                  ...x,
                  status: 'PROCESSING',
                  processingAt: res.data.processingAt
                }
                : x
            );

            this.andonDataList$.next(updatedList);
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
            console.log(res)
            const updatedList = this.andonDataList$.value
              .filter(x => x.id !== item.id);
            this.andonDataList$.next(updatedList);
            setTimeout(() => {
              this.Description = '';
              this.ErrorStage = '';
            }, 100);
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

  // hàm xử lý update time mỗi 1s. sẽ check thay đổi của data andonlist để hiển thị giao diện.
  // vm$ = this.timer$.pipe(
  //   map(() => {
  //     const list = this.andonDataList$.value;
  //     const now = Date.now();

  //     return list.map(item => {
  //       const created = new Date(item.created_at.replace(' ', 'T')).getTime();

  //       const status = item.status?.trim().toUpperCase();

  //       let waitingTime = '00:00:00';
  //       let processingTime = '00:00:00';

  //       if (status === 'CALLING') {
  //         waitingTime = this.formatTime(now - created);
  //       }

  //       if (status === 'PROCESSING' && item.processingAt) {
  //         const start = new Date(item.processingAt.replace(' ', 'T')).getTime();
  //         waitingTime = this.formatTime(start - created);
  //         processingTime = this.formatTime(now - start);
  //       }

  //       return {
  //         ...item,
  //         waitingTime,
  //         processingTime,

  //         // 🔥 thêm flag UI
  //         isCalling: status === 'CALLING',
  //         isProcessing: status === 'PROCESSING'
  //       };
  //     });
  //   })
  // );

  startTimer() {
    this.timerId = setInterval(() => {
      const now = Date.now();
      const list = this.andonDataList$.value;
      list.forEach(item => {
        const created = new Date(item.created_at.replace(' ', 'T')).getTime();
        const status = item.status?.trim().toUpperCase();

        if (status === 'CALLING') {
          item.waitingTime = this.formatTime(now - created);
          item.processingTime = '00:00:00';
        }

        if (status === 'PROCESSING' && item.processingAt) {
          const start = new Date(item.processingAt.replace(' ', 'T')).getTime();

          item.waitingTime = this.formatTime(start - created);
          item.processingTime = this.formatTime(now - start);
        }

      });
      this.andonDataList$.next([...list]);

      // ❌ KHÔNG next()
    }, 1000);
  }


  trackById(index: number, item: any) {
    return item.id;
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


  // xử lý luồng done gọi hỗ trợ.
  isDoneModalVisible = false;
  selectedItem: any;

  openDoneModal(item: any): void {
    this.selectedItem = item;

    this.doneForm.reset({
      method: 'repair',
      oldStatus: 'NG'
    });

    this.isDoneModalVisible = true;
  }

  handleCancel(): void {
    this.isDoneModalVisible = false;
  }


  handleSubmit(): void {
    const formValue = this.doneForm.value;

    if (formValue.method === 'repair' && !formValue.repairNotes) {
      this.popup.error('Vui lòng nhập nội dung sửa chữa');
      return;
    }

    if (formValue.method === 'replace' && !formValue.newDevice) {
      this.popup.error('Vui lòng nhập thiết bị mới');
      return;
    }

    const payload = {
      ...formValue,
      id: this.selectedItem.id
    };
    this.andonService.updateDoneStatus(this.selectedItem.id)
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {

            // 🔥 remove item
            const updatedList = this.andonDataList$.value
              .filter(x => x.id !== this.selectedItem.id);

            this.andonDataList$.next(updatedList);

            // 🔥 delay để tránh NG0100
            this.isDoneModalVisible = false;
            this.cd.detectChanges(); // 🔥 fix NG0100
            this.popup.success('Hoàn thành xử lý');

          } else {
            this.popup.error('Thất bại');
          }
        }
      });
  }
}