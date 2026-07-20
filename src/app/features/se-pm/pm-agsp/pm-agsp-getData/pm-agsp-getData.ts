import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
// import { SePuService } from '../../../../features/se-pu/se-pu.service;
import { PopupService } from '../../../../shared/service/popup.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import dayjs from 'dayjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
    NzUploadModule,
    NzSelectModule,
    CommonModule,
    ReactiveFormsModule,
    NzEmptyModule,
    NzDatePickerModule
  ],
  templateUrl: './pm-agsp-getData.html',
  styleUrls: ['./pm-agsp-getData.css']
})
export class sePmAgspGetDataComponent {
  form!: FormGroup;
  user = '';
  msType = '';
  program = true;
  router: any;
  selectedFile: File | null = null;
  fileName1: string = '';
  fileName2: string = '';
  lotData: any[] = [];

  constructor(private message: NzMessageService, private fb: FormBuilder, private popupService: PopupService, private modal: NzModalService) { }
  ngOnInit() {
    this.form = this.fb.group({
      month: [new Date()],
      reportName: [null, Validators.required]
    });
    // this.searchForm.get('program')?.valueChanges.subscribe(value => {
    //   if (value !== 'M') {
    //     this.searchForm.patchValue({
    //       lotA: null
    //     });
    //   }
    // });

    // this.getDataLot();
  }

  fileList: File[] = [];


  beforeUpload = (
    file: NzUploadFile,
    fileList: NzUploadFile[]
  ): boolean => {
    const realFile = file as unknown as File;

    const isExcel =
      realFile.name.endsWith('.xlsx') ||
      realFile.name.endsWith('.xls');

    if (!isExcel) {
      return false;
    }

    this.fileList = [...this.fileList, realFile];

    return false;
  };

  removeFile(index: number): void {
    this.fileList.splice(index, 1);
    this.fileList = [...this.fileList];
  }

  formatFileSize(size: number): string {
    if (size < 1024) return size + ' B';
    if (size < 1 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / 1024 / 1024).toFixed(1) + ' MB';
  }

  // upload(): void {
  //   const reportName = this.form.value.reportName;
  //   const month = dayjs(this.form.value.month).format('YYYY-MM');
  //   const formData = new FormData();


  //   this.fileList.forEach(file => {
  //     formData.append('files', file);
  //   });

  //   if (reportName == '15') {
  //     this.SePuService.getTransData(formData, month, reportName).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         if (response.message === 'success') {
  //           this.popupService.success('Xử lý dữ liệu thành công!');
  //           console.log(response);
  //         } else if (response.message === 'error') {
  //           this.popupService.error('Xử lý dữ liệu thất bại!');
  //         }
  //         else {
  //           this.popupService.error(response.message);
  //           console.log(response);
  //         }
  //       },
  //       error: (error) => {
  //         this.popupService.error('Xử lý dữ liệu thất bại!');
  //         console.error(error);
  //       }
  //     });
  //   } else if (reportName == '15a') {
  //     this.SePuService.getTransData15a(formData, month, reportName).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         if (response.message === 'success') {
  //           this.popupService.success('Xử lý dữ liệu thành công!');
  //           console.log(response);
  //         } else if (response.message === 'error') {
  //           this.popupService.error('Lỗi Xử lý dữ liệu!');
  //         }
  //         else {
  //           this.popupService.error(response.message);
  //           console.log(response);
  //         }
  //       },
  //       error: (error) => {
  //         this.popupService.error(error.message);
  //         console.error(error);
  //       }
  //     });
  //   }


  // }


  // checkExistedData() {
  //   if (this.form.invalid) {
  //     Object.values(this.form.controls).forEach((control) => {
  //       control.markAsDirty();
  //       control.updateValueAndValidity();
  //     });

  //     this.message.error('Vui lòng nhập đầy đủ thông tin');
  //     return;
  //   }

  //   const reportName = this.form.value.reportName;
  //   const month = dayjs(this.form.value.month).format('YYYY-MM');


  //   this.SePuService.checkExistedData(month, reportName).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       if (response.message === 'existed') {
  //         this.modal.confirm({
  //           nzTitle: 'Dữ liệu đã tồn tại',
  //           nzContent: 'Bạn có muốn ghi đè dữ liệu hiện tại không?',
  //           nzOkText: 'Đồng ý',
  //           nzCancelText: 'Hủy',
  //           nzOnOk: () => {
  //             this.upload();
  //           }
  //         });
  //       } else {
  //         this.upload();
  //       }
  //     },
  //     error: (error) => {
  //       this.popupService.error('Có lỗi xảy, vui lòng kiểm tra lại!');
  //       console.error(error);
  //     }
  //   });


  // }

}