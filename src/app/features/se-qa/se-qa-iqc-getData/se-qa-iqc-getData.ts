import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from 'express';
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

  constructor(private message: NzMessageService, private qaService: qaService, private fb: FormBuilder) { }
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
    console.log(this.searchForm.value);
    formData.append('file', this.selectedFile);
    formData.append('user', this.searchForm.value.user);
    formData.append('status', this.searchForm.value.status);
    // gọi API backend
    console.log(formData);
    this.qaService.getDataExcel(formData).subscribe((res) => {
      console.log(res.data);
    });
  }

}