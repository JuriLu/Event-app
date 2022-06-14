import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../Services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private authService:AuthService) { }

  canActivate(activatedRoute: ActivatedRouteSnapshot): boolean{
    if (this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }


}
