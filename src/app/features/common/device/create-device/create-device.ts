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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';



import { DeviceService } from '../../device/device.service';
import { ButtonPrimary } from '../../../../shared/components/button-primary/button-primary';
import { PopupService } from '../../../../shared/service/popup.service';
import { LoadingService } from '../../../../shared/service/loading.service';
import { AuthService } from '../../../../core/auth/service/auth.service';

@Component({
  selector: 'create-machine',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
  ],
  templateUrl: './create-device.html',
  styleUrls: ['./create-device.css']
})
export class CreateDeviceComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  sections: { id: number; name: string }[] = [];
  positions: { id: number; name: string }[] = [];
  roles: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private deviceService: DeviceService,
    private popupService: PopupService,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  deviceForm!: FormGroup;

  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      location: [null, [Validators.required]],
      gscmName: [null],
      code: [null, [Validators.required]],
      serialNumber: [null],
      supplier: [null],
      fa: [null],
      faCode: [null],
      poNumber: [null],
      kianNo: [null],
      status: [null],
      dateTimeUsed: [null],
      dateTime: [null]
    });
  }

  submitForm() {
    if (this.deviceForm.valid) {
      const payload = {
        ...this.deviceForm.value
      };

      console.log(payload);
      // call API
      this.deviceService.createDevice(payload).subscribe({
        next: (res: any) => {
          console.log(res)
          this.popupService.success('Tạo thiết bị thành công');
        },
        error: (error: any) => {
          this.popupService.error(error.error.message);
        }
      });
    }
  }
}