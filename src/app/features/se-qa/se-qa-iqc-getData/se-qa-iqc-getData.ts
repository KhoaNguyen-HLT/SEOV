import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from 'express';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { CommonModule } from '@angular/common';
import { qaService } from '../se-qa.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,
    NzGridModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSliderModule,
    NzDividerModule,
    NzIconModule,
    NzUploadModule,
    CommonModule
  ],
  templateUrl: './se-qa-iqc-getData.html',
  styleUrls: ['./se-qa-iqc-getData.css']
})
export class seQaIqcGetDataComponent {
  size: NzButtonSize = 'large';
  router: any;

  selectedFile: File | null = null;
  fileName: string = '';

  constructor(private message: NzMessageService, private qaService: qaService) { }

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]) => {
    this.fileName = file.name ?? '';
    this.selectedFile = file as any; // tạm xử lý

    return false; // chặn auto upload
  };

  upload() {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    // gọi API backend
    console.log('Upload file:', this.selectedFile);
    this.qaService.getDataExcel(formData).subscribe((res) => {
      console.log(res);
    });
  }

}