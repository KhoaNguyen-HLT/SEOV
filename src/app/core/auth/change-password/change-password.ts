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

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../service/auth.service';
import { AppIconComponent } from '../../../shared/components/icon/icon-component';
import { PopupService } from '../../../shared/service/popup.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    AppIconComponent
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  userName: string = '';
  constructor(private PopupService: PopupService, private authService: AuthService) { }

  loading = false;
  showPassword = false;
  showConfirm = false;

  form = this.fb.group(
    {
      username: ['',Validators.required],
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  ngOnInit(): void {
    this.getUserInfor();
  }

  getUserInfor(): void {
    this.authService.getUserInfobyToken();
    this.userName = this.authService.userName;
    this.form.patchValue({
    username: this.userName
  });
  }


  handleReset(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.PopupService.error('Mật khẩu chưa khớp nhau hoặc chưa đủ 8 ký tự. Vui lòng kiểm tra lại.');
      return;
    }

    const payload = {
      username: this.form.value.username!,
      oldPassword: this.form.value.oldPassword!,
      password: this.form.value.password!
    };

    // this.loading = true;

    console.log('Reset password payload:', payload);

    // TODO: gọi API reset password ở đây
    // this.userService.resetPassword(payload).subscribe((res) => {

    //   this.loading = false;
    //   this.PopupService.success('Reset mật khẩu thành công');
    // });


    this.authService.changePassword(payload).subscribe({
      next: (res) => {
        if(res.message === 'success') {
        console.log('Reset password response:', res);
        this.PopupService.success('Reset mật khẩu thành công'); }
        else {
        console.log('Reset password response:', res);
        this.PopupService.error('Reset mật khẩu thất bại vui lòng thử lại'); }
      },
      error: () => {
        console.log('Reset password error');
        this.PopupService.error('Reset mật khẩu thất bại vui lòng thử lại');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/welcome/user']);
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}