import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuth(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuth(state.url);
  }

  private checkAuth(returnUrl: string): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const token = this.TokenStorageService.getToken();

    if (!token) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl }
      });
      return false;
    }

    return true;
  }
}