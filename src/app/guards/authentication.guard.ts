import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  /**
   *
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(): boolean {
    if (this.authenticationService.loggedIn([])) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }

}
