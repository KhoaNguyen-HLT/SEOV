import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
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
    NzEmptyModule
  ],
  templateUrl: './se-qa-iqc-getData.html',
  styleUrls: ['./se-qa-iqc-getData.css']
})
export class seQaIqcGetDataComponent {
  searchForm!: FormGroup;
  user = '';
  status = '';
  router: any;
  selectedFile: File | null = null;
  fileName: string = '';

  constructor(private message: NzMessageService, private qaService: qaService, private fb: FormBuilder, private popupService: PopupService) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      user: [null],
      status: [null]
    });
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
      if(res.message === 'success') {
        console.log(res.data);
        this.popupService.success('Upload thành công!');
      } else {
        this.popupService.error('Upload thất bại cần kiềm tra lại');
      }
    }
  });
  }

}