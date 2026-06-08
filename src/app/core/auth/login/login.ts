import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupService } from '../../../shared/service/popup.service';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { environment } from '../../environments/environments.prod';



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
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private PopupService: PopupService,
    private TokenStorageService: TokenStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    if (isPlatformBrowser(this.platformId)) {
      const token = this.TokenStorageService.getToken();

      if (token) {
        this.authService.checkToken().subscribe({
          next: (res) => {
            if (res) {
              const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
              alert(returnUrl);
              if (returnUrl) {
                this.router.navigateByUrl(returnUrl);
              } else {
                this.router.navigate(['/welcome']);
              }
            } else {
              this.TokenStorageService.removeToken();
            }
          },
          error: () => {
            this.TokenStorageService.removeToken();
          },
        });
      }

      // KHÔNG navigate /login ở đây nữa
    }
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
          // this.TokenStorageService.setToken(res.token);
          this.PopupService.success('Đăng nhập thành công');
          setTimeout(() => {
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
            } else {
              this.router.navigate(['/welcome']);
            }
          }, 1000);
        } else this.PopupService.error('Sai thông tin đăng nhập, vui lòng thử lại sau');
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
