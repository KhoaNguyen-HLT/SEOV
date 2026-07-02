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

import { UserService } from '../user.service';

import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary';
import { PopupService } from '../../../shared/service/popup.service';
import { LoadingService } from '../../../shared/service/loading.service';
import { AuthService } from '../../../core/auth/service/auth.service';
import { getRandomValues } from 'crypto';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [
    ButtonPrimary,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css']
})
export class CreateUserComponent implements OnInit {

  form!: FormGroup;
  isLoading$!: Observable<boolean>;

  departments: { id: number; departmentCode: string }[] = [];
  positions: { id: number; positionCode: string, positionName: string  }[] = [];
  roles: { id: number; code: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private popupService: PopupService,
    private loadingService: LoadingService,
    private authService: AuthService,
  ) {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: [''],
      email: ['', Validators.email],
      department: [null],
      position: [null],
      role: [[]]
    });

    this.getUserInfor();
    this.getAllRole();
    this.getDepartment();
    this.getPosition();
  }

  getUserInfor(): void {
    this.authService.getUserInfobyToken();
    console.log(this.authService.role);
    console.log(this.authService.permissions);
  }

  loadData() {
    // fake data (sau này gọi API)
    // this.departments = [
    //   { id: 1, name: 'IT' },
    //   { id: 2, name: 'HR' }
    // ];

    // this.positions = [
    //   { id: 1, name: 'Manager' },
    //   { id: 2, name: 'Staff' }
    // ];


  }

  submit() {
    // console.log('Create user:', this.form.value);
    // console.log('Create user:', data);
    this.loadingService.show();
    this.userService.createUser(this.form.value).subscribe({
      next: (response) => {
        this.loadingService.hide();
        this.popupService.success('Tạo User thành công');
        // this.router.navigate(['/welcome/user']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.loadingService.hide();
        this.popupService.error('Lỗi khi tạo User');
      }
    });
  }

  getAllRole() {
    this.userService.getAllRole().subscribe({
      next: (res) => {
        this.roles = res.data;

      },
      error: (error) => {
        this.popupService.error('Lỗi tải dữ liệu quyền');
      }
    });
  }
  getDepartment() {
    this.userService.getDepartment().subscribe({
      next: (res) => {
        this.departments = res.data;
      },
      error: (error) => {
        this.popupService.error('Lỗi tải dữ liệu phòng ban');
      }
    });
  }
  getPosition() {
    this.userService.getPosition().subscribe({
      next: (res) => {
        this.positions  = res.data;
      },
      error: (error) => {
        this.popupService.error('Lỗi tải dữ liệu chức vụ');
      }
    });
  }

  back() {
    this.router.navigate(['/welcome/user']);
  }
}