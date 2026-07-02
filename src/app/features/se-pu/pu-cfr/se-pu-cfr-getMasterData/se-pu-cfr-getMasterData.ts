import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
import { SePuService } from '../../se-pu.service';
import { PopupService } from '../../../../shared/service/popup.service';
import { Observable } from 'rxjs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import dayjs from 'dayjs';

@Component({
  selector: 'app-se-pu-cfr-get-master-data',
  standalone: true,
  imports: [
    FormsModule,
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
    NzDatePickerModule,
  ],
  templateUrl: './se-pu-cfr-getMasterData.html',
  styleUrls: ['./se-pu-cfr-getMasterData.css'],
})
export class sePuCfrGetMasterDataComponent {
  form!: FormGroup;
  user = '';
  msType = '';
  program = true;
  router: any;
  selectedFile: File | null = null;
  fileName1: string = '';
  fileName2: string = '';
  lotData: any[] = [];

  constructor(
    private message: NzMessageService,
    private SePuService: SePuService,
    private fb: FormBuilder,
    private popupService: PopupService,
  ) { }
  ngOnInit() {
    this.form = this.fb.group({
      reportName: [null, Validators.required],
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

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {
    const realFile = file as unknown as File;

    const isExcel = realFile.name.endsWith('.xlsx') || realFile.name.endsWith('.xls');

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

  upload(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });

      this.message.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const reportName = this.form.value.reportName;
    const formData = new FormData();
    this.fileList.forEach((file) => {
      formData.append('files', file);
    });
    console.log(reportName);

    this.SePuService.getMasterData(formData, reportName).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this.popupService.success('Xử lý dữ liệu thành công!');
        } else {
          this.popupService.error('Xử lý dữ liệu thất bại, cần kiểm tra lại!');
        }
      },
      error: (error) => {
        this.popupService.error('Xử lý dữ liệu thất bại!');
        console.error(error);
      }
    });




  }
}
