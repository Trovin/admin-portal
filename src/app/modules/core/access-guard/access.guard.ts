import { Injectable } from '@angular/core';
import {
  Router,
  UrlTree,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const path = state.url.substr(1);

    if (!this.authService.userValue && path.includes('portal')) {
      this.router.navigateByUrl('auth');
      return false;
    }

    if (this.authService.userValue && path.includes('auth')) {
      this.router.navigateByUrl('portal');
      return false;
    }

    return true;
  }

}
