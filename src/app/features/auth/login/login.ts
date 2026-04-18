import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PopupService } from '../../../shared/service/popup.service';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private PopupService: PopupService,
  ) {}

  ngOnInit(): void {
    // ✅ check token
    const token = (() => {
      if (typeof window !== 'undefined' && localStorage) {
        return localStorage.getItem('token');
      }
      return null;
    })();
    if (token) {
      this.authService.checkToken().subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/welcome']);
          }
        },
        error: () => {
          localStorage.removeItem('token');
        },
      });
    }

    // ✅ init form
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  login() {
    if (this.form.invalid) {
      this.PopupService.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    this.loading = true;

    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        console.log('Login success', res);
        if (res.authenticated) {
          localStorage.setItem('token', res.token);
          this.PopupService.success('Đăng nhập thành công');
          setTimeout(() => {
            this.router.navigate(['/welcome']);
          }, 1000);
        } else this.PopupService.error('Sai thông tin đăng nhập, vui lòng thử lại');
      },
      error: (err) => {
        console.error('Login failed', err);
        this.PopupService.error('Sai thông tin đăng nhập, vui lòng thử lại');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
