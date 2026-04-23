import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { UserService } from '../se-andon.service';

import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary';
import { PopupService } from '../../../shared/service/popup.service';
import { LoadingService } from '../../../shared/service/loading.service';
import { AuthService } from '../../auth/service/auth.service';

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
    NzGridModule
  ],
  templateUrl: './se-andon-call.html',
  styleUrls: ['./se-andon-call.css']
})
export class seAndonCallComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    console.log(213213);
  }

  callGroup(team: string): void {
    console.log(team);
  }

  // Logic popup
  isModalVisible = false;
  isRepairMethod = true;

  openModal(): void {
    this.isModalVisible = true;
    // Reset form logic
    this.isRepairMethod = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  toggleMethodForm(): void {
    this.isRepairMethod = this.isRepairMethod ? false : true;
  }

  // Logic xử lý form
  submitResolution(): void {
    if (this.isRepairMethod) {
      // Logic sửa chữa tại chỗ
      console.log("Sửa chữa tại chỗ");
    } else {
      // Logic thay thế thiết bị
      console.log("Thay thế thiết bị");
    }
    this.isModalVisible = false;
  }


}