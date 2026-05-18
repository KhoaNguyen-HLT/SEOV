import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private TokenStorageService: TokenStorageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const token = this.TokenStorageService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}