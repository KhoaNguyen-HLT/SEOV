import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, DestroyRef, inject } from '@angular/core';
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
import { NzIconModule, provideNzIcons } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { NzTableComponent } from "ng-zorro-antd/table";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TokenStorageService } from '../../../core/auth/service/token-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
    NzRadioModule,
    NzIconModule,
    NzTableComponent,
    NzTableModule,
    NzTagModule
  ],
  templateUrl: './se-andon-call.html',
  styleUrls: ['./se-andon-call.css']
})


export class seAndonCallComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  doneForm!: FormGroup;
  Department: string = '';
  ReasonChangePic: string = '';
  Line = '';
  ErrorStage = '';
  Description = '';
  userName = '';
  isLineModalVisible = false;
  isChangePicModalVisible = false;
  andonDataList$ = new BehaviorSubject<any[]>([]);
  andonDataListLog$ = new BehaviorSubject<any[]>([]);
  logMap: Record<number, any[]> = {};
  // token: string = '';
  // expand: boolean = true;
  updateLogMap() {
    const logs = this.andonDataListLog$.value;

    this.logMap = logs.reduce((acc, log) => {
      if (!acc[log.id]) acc[log.id] = [];
      acc[log.id].push(log);
      return acc;
    }, {} as Record<number, any[]>);
  }
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
    private router: Router,
    private TokenStorageService: TokenStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

  }
  expandedRowId: number | null = null;

  toggleExpand(id: number): void {
    this.expandedRowId =
      this.expandedRowId === id ? null : id;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.TokenStorageService.getToken();
      if (token) {
        const decoded: any = jwtDecode(token);
        this.userName = decoded.sub;
      }
    }

    this.getLines();

    if (!this.Line) {
      this.isLineModalVisible = true; // 🔥 open modal
    }

    this.doneForm = this.fb.group({
      method: ['repair'],
      repairNotes: [''],
      oldDevice: [''],
      newDevice: [''],
      oldStatus: ['NG'],
      replaceReason: ['']
    });

    this.startTimer();
    this.buildDetailMap();
  }

  getLineName(): string {
    const item = this.line_list.find(x => x.siteCode === this.Line);
    return item ? item.lineName : this.Line;
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
    // console.log(this.line_list)
  }

  // gọi API vào bảng andon data để lấy thông tin các request
  getDataPending(siteCode: any) {
    this.andonService.getDataPending(siteCode)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          // thêm expand cho từng item
          const newItems = res.data;
          this.andonDataListLog$.next(res.changeGroupData); // ✅ FIX
          this.andonDataList$.next([
            ...this.andonDataList$.value,
            ...newItems // 👈 spread mảng
          ]);
          this.buildDetailMap();
        },
        error: (err: any) => {
          this.popup.error(err.error.message);
        }
      })

  }

  callGroup(team: any): void {
    const hasSameTeam = this.andonDataList$.value.some(
      (x: any) => x.team === Number(team) && String(x.errorStage) === String(this.ErrorStage)
    );

    if (this.Line === null || this.Line === undefined || this.Line === '') {
      this.popup.error('Vui lòng chọn Line');
      this.isLineModalVisible = true;
      return;
    }

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
    this.andonService.callGroup(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            // add thêm dữ liệu vào danh sách ANDonDataList
            const newItem = res.data;
            this.andonDataList$.next([...this.andonDataList$.value, newItem]);
            this.popup.success('Báo lỗi thành công');
          } else {
            this.popup.error('Gọi nhóm thất bại');
          }
        },
        error: (err: any) => {
          this.popup.error(err.error.message);
        }
      })
  }

  updateProcessingStatus(item: any): void {
    this.andonService.updateProcessingStatus(item.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {

          if (res.message == 'success') {
            // nếu chưa dùng websocket thì update local
            const updatedList = this.andonDataList$.value.map(x =>
              x.id === item.id
                ? {
                  ...x,
                  status: 'PROCESSING',
                  processingAt: res.data.processingAt,
                  updated_at: res.data.updated_at
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
          this.popup.error(err.error.message);
        }
      });
  }


  // hàm xử lý update time mỗi 1s. sẽ check thay đổi của data andonlist để hiển thị giao diện.

  // startTimer() {
  //   interval(1000)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(() => {
  //       const now = Date.now();
  //       const list = this.andonDataList$.value;

  //       const updated = list.map(item => {
  //         const created = new Date(item.created_at.replace(' ', 'T')).getTime();
  //         const status = item.status?.trim().toUpperCase();

  //         if (status === 'CALLING') {
  //           return {
  //             ...item,
  //             waitingTime: this.formatTime(now - created),
  //             processingTime: '00:00:00'
  //           };
  //         }

  //         if (status === 'PROCESSING' && item.processingAt) {
  //           const start = new Date(item.processingAt.replace(' ', 'T')).getTime();

  //           return {
  //             ...item,
  //             waitingTime: this.formatTime(start - created),
  //             processingTime: this.formatTime(now - start)
  //           };
  //         }

  //         return item;
  //       });

  //       this.andonDataList$.next(updated);
  //     });
  // }

  startTimer() {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const now = Date.now();

        const updated = this.andonDataList$.value.map(item => {
          const created = new Date(item.created_at.replace(' ', 'T')).getTime();
          const status = item.status?.trim().toUpperCase();

          let waitingTime = item.waitingTime;
          let processingTime = item.processingTime;

          if (status === 'CALLING') {
            waitingTime = this.formatTime(now - created);
            processingTime = '00:00:00';
          }

          if (status === 'PROCESSING' && item.processingAt) {
            const start = new Date(item.processingAt.replace(' ', 'T')).getTime();

            waitingTime = this.formatTime(start - created);
            processingTime = this.formatTime(now - start);
          }

          return {
            ...item,
            waitingTime,
            processingTime
          };
        });

        this.andonDataList$.next(updated);
      });
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
    this.isLineModalVisible = false;
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

    let payload: any = {
      ...formValue,
      id: this.selectedItem.id
    };
    // return;
    this.andonService.updateDoneStatus(this.selectedItem.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            const updatedList = this.andonDataList$.value
              .filter(x => x.id !== this.selectedItem.id);

            this.andonDataList$.next(updatedList);
            this.isDoneModalVisible = false;
            this.popup.success('Hoàn thành xử lý');

          } else {
            this.popup.error('Thất bại');
          }
        }
      });
  }


  // confirm thay đổi phòng ban
  id_change_pic: any = '';
  current_team: any = '';
  start_time: any = '';
  from_user: any = '';
  confirmLine() {
    if (this.Line === '' || this.Line === undefined || this.Line === null) {
      this.popup.error('Vui lòng chọn Line');
      return;
    }
    this.isLineModalVisible = false;
    this.getDataPending(this.Line);
  }

  changePicModal(item: any) {
    this.isChangePicModalVisible = true;
    this.current_team = item.team;
    this.id_change_pic = item.id;
    this.start_time = item.updated_at;
  }
  handleCancelChangePic() {
    this.isChangePicModalVisible = false;
  }

  confirmChangePic() {
    if (this.from_user === '') {
      this.popup.error('Nhập user');
      return;
    }
    if (this.Department === '') {
      this.popup.error('Nhập bộ phận');
      return;
    }
    if (this.ReasonChangePic.trim() === '') {
      this.popup.error('Nhập lý do chuyển bộ phận');
      return;
    }

    if (Number(this.Department) === Number(this.current_team)) {
      this.popup.error('Không chuyển đến cùng bộ phận');
      return;
    }

    const payload = {
      id: this.id_change_pic,
      from_team: this.current_team,
      to_team: this.Department,
      reason: this.ReasonChangePic,
      start_time: this.start_time,
      from_user: this.from_user
    };
    this.andonService.changeGroup(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            this.andonDataListLog$.next(res.changeGroupData);
            this.isChangePicModalVisible = false;
            const updatedList = this.andonDataList$.value.map(x =>
              x.id === res.data.id
                ? {
                  ...x,
                  team: res.data.team,
                  groupName: res.data.groupName,
                  updated_at: res.data.updated_at,
                  expand: true
                }
                : x
            );

            this.andonDataList$.next(updatedList);
            this.buildDetailMap();

            this.popup.success('Chuyển bộ phận thành công');

          } else {
            this.popup.error('Chuyển bộ phận thất bại');
          }
        }
      });
  }
  goToHomePage() {
    this.router.navigate(['/welcome']);
  }


  // expand info. xử lý expan thông tin chi tiết theo từng id chính
  andonDetailData(id: number) {
    this.buildDetailMap();
  }

  detailMap: { [key: number]: any[] } = {};
  listExpand: any[] = [];

  buildDetailMap() {
    this.detailMap = {};
    const items = this.andonDataListLog$.value;
    this.listExpand = [...new Set(items.map(x => x.id))];
    // update expand
    const updated = this.andonDataList$.value.map(item => ({
      ...item,
      expand: item.expand ?? this.listExpand.includes(item.id)
    }));

    // cập nhật table
    this.andonDataList$.next(updated);
    items.forEach((item: any) => {
      if (!this.detailMap[item.id]) {
        this.detailMap[item.id] = [];
      }
      this.detailMap[item.id].push(item);
    });

  }


  formatDuration(start: string, end: string): string {

    const diffMs =
      new Date(end).getTime() -
      new Date(start).getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  }


}