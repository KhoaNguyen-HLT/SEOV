import { AuthService } from './features/auth/service/auth.service';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  canActivate(): Observable<boolean> {
    // ❗ Nếu đang chạy trên server → bỏ qua check
    if (!isPlatformBrowser(this.platformId)) {
      return of(true);
    }
    const token = localStorage.getItem('token');
    console.log('AuthGuard: Checking token', token);
    if (!token || token === null || token === undefined) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.checkToken().pipe(
      map((res) => {
        if (res) {
          return true; // ✅ cho vào component con
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }
}
