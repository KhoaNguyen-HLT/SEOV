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
import { qaService } from '../se-qa.service';
import { PopupService } from '../../../shared/service/popup.service';
import { Observable } from 'rxjs';

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
  ],
  templateUrl: './se-qa-iqc-getData.html',
  styleUrls: ['./se-qa-iqc-getData.css']
})
export class seQaIqcGetDataComponent {
  searchForm!: FormGroup;
  reportForm!: FormGroup;

  user = '';
  status = '';
  router: any;
  selectedFile: File | null = null;
  fileName: string = '';
  lotData: any[] = [];

  constructor(private message: NzMessageService, private qaService: qaService, private fb: FormBuilder, private popupService: PopupService) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      user: [null],
      status: [null]
    });
    this.reportForm = this.fb.group({
      lotA: [null, Validators.required],
      lotB: [null, Validators.required],
      lotNo: [null, Validators.required],
      program: [null, [Validators.required]]
    });

    this.searchForm.get('program')?.valueChanges.subscribe(value => {
    if (value !== 'M') {
      this.searchForm.patchValue({
        lotA: null
      });
    }
  });

    this.getDataLot();
  }

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]) => {
    this.fileName = file.name ?? '';
    this.selectedFile = file as any; // tạm xử lý
    return false; // chặn auto upload
  };

  upload() {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('user', this.searchForm.value.user);
    formData.append('status', this.searchForm.value.status);
    console.log(formData);
    this.qaService.getDataExcel(formData).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          console.log(res.data);
          this.popupService.success('Upload thành công!');
        } else {
          this.popupService.error('Upload thất bại cần kiềm tra lại');
        }
      }
    });
  }


  getDataLot(){
    // Gọi service để lấy dữ liệu Lot-No
    this.qaService.getLotData().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.lotData = res.data;
          // Xử lý dữ liệu Lot-No nếu cần
        }
      }
    });

  }

  // lấy báo cáo
  getReport() {
    if (this.reportForm.invalid) {
      Object.values(this.reportForm.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      this.popupService.error('Vui lòng điền đầy đủ thông tin để lấy báo cáo!');
      return;
    }

    const formData = {
      lotA: this.reportForm.value.lotA,
      lotB: this.reportForm.value.lotB,
      program: this.reportForm.value.program
    };
    console.log(formData);
    // Gọi service để lấy báo cáo dựa trên formData
    this.qaService.getReport(formData.lotA, formData.lotB, formData.program).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          console.log(res.data);
          this.popupService.success('Lấy báo cáo thành công!');
        } else {
          this.popupService.error('Lấy báo cáo thất bại, vui lòng thử lại!');
        }
      }
    });

  }

}