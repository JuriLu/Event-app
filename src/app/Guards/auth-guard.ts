import {Injectable} from "@angular/core";
import {AuthService} from "../Services/auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/auth/signin']);
    return false;
  }


}
