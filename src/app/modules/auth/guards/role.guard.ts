import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  NavigationExtras,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { roleRoutes, UserRole } from 'src/app/core/constants/roles';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const userRole = await this.authService.getUserRole();
    if (roleRoutes[userRole as UserRole].includes(state.url)) {
      return true;
    } else {
      const extras: NavigationExtras = {
        queryParams: {
          message: 'not authorized',
        },
      };
      return this.router.createUrlTree(['/admin/pages/not-authorized'], extras);
    }
  }
}
