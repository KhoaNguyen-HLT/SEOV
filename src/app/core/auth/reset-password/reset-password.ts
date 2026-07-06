import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../app/features/user/user.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../service/auth.service';
import { AppIconComponent } from '../../../shared/components/icon/icon-component';
import { PopupService } from '../../../shared/service/popup.service';
import { NzSelectModule } from 'ng-zorro-antd/select';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    AppIconComponent,
    NzSelectModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPasswordComponent {
  users: any[] = [];
  private fb = inject(FormBuilder);
  private router = inject(Router);
  constructor(private PopupService: PopupService, private authService: AuthService, private UserService: UserService) { };

  ngOnInit(): void {
    this.getAllUsers();

  }

  getAllUsers() {
    this.UserService.getUsers().subscribe((res: any) => {
      console.log('Users:', res);
      this.users = res;
    });

  }

  loading = false;
  showPassword = false;
  showConfirm = false;

  form = this.fb.group(
    {
      username: ['', Validators.required]
    },
    {
    }
  );

  handleReset(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.PopupService.error('Vui chọn user');
      return;
    }

    const payload = {
      username: this.form.value.username!
    };

    console.log('Reset password payload:', payload);

    // TODO: gọi API reset password 
    this.authService.resetPassword(payload)
    .subscribe({
      next: (res) => {
        if(res && res.message == 'success') {
        console.log('Reset password response:', res);
        this.PopupService.success('Reset mật khẩu thành công');
      }},  
      error: () => {
        console.log('Reset password error');
        this.PopupService.error('Reset mật khẩu thất bại');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/welcome/user']);
  }

  
}