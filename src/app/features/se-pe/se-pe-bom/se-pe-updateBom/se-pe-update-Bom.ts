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
import { SePeService } from '../../se-pe.service';
import { PopupService } from '../../../../shared/service/popup.service';
import { Observable } from 'rxjs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import dayjs from 'dayjs';

@Component({
  selector: 'app-user',
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
  templateUrl: './se-pe-update-Bom.html',
  styleUrls: ['./se-pe-update-Bom.css'],
})
export class sePeUpdateBomComponent {
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
    private SePeService: SePeService,
    private fb: FormBuilder,
    private popupService: PopupService,
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      month: [new Date()],
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

  fileList: NzUploadFile[] = [];

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    // file thực chất chính là File
    this.selectedFile = file as unknown as File;
    return false;
  };

  removeFile(): void {
    this.fileList = [];
  }

  formatFileSize(size: number): string {
    if (size < 1024) return size + ' B';
    if (size < 1 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / 1024 / 1024).toFixed(1) + ' MB';
  }

  upload(): void {
    if (!this.selectedFile) {
      console.log('Chưa chọn file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    console.log('File đã được chọn:', this.selectedFile);

    this.SePeService.getBomData(formData).subscribe({
      next: (response) => {
        this.popupService.success('Xử lý dữ liệu thành công!');
        console.log(response);
      },
      error: (error) => {
        this.popupService.error('Xử lý dữ liệu thất bại!');
        console.error(error);
      },
    });
  }
}
