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
import { AuthService } from '../../auth/service/auth.service';

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

  sections: { id: number; name: string }[] = [];
  positions: { id: number; name: string }[] = [];
  roles: { id: number; name: string }[] = [];

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
      sections: [null],
      positionId: [null],
      roleIds: [[]]
    });

    this.getUserInfor();
    this.loadData();
  }

  getUserInfor(): void {
    this.authService.getUserInfobyToken();
    console.log(this.authService.role);
    console.log(this.authService.permissions);
  }

  loadData() {
    // fake data (sau này gọi API)
    this.sections = [
      { id: 1, name: 'IT' },
      { id: 2, name: 'HR' }
    ];

    this.positions = [
      { id: 1, name: 'Manager' },
      { id: 2, name: 'Staff' }
    ];

    this.roles = [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'USER' }
    ];
  }

  submit() {
    // if (this.form.invalid) return;
    // var data = {
    //   username: "3014130",
    //   password: "12345",
    //   name: "khoa",
    //   email: "",
    //   section: "1",
    //   position: "1"
    // }

    // console.log('Create user:', this.form.value);
    // console.log('Create user:', data);
    this.loadingService.show();
    this.userService.createUser(this.form.value).subscribe({
      next: (response) => {
        console.log('User created:', response);
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

  back() {
    this.router.navigate(['/welcome/user']);
  }
}