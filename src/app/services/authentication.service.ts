import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { LocalStorageService } from "../services/local-storage.service";
import { CONFIGS } from "../configs/settings.config";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private welcomeMassageURL = CONFIGS.HOST;
  private loginURL = CONFIGS.HOST + "users/login";
  private registerURL = CONFIGS.HOST + "users/register";

  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getWelcomeMessage() {
    return this.http.get<any>(this.welcomeMassageURL);
  }

  register(user: any) {
    return this.http.post<any>(this.registerURL, user);
  }

  login(user: any) {
    return this.http.post<any>(this.loginURL, user);
  }

  loggedIn(role: string[]) {
    let checkToken = !!this.localStorageService.get("tokenUser") && !!this.localStorageService.getObject("infoUser");
    let checkRole = role.includes(this.localStorageService.getObject("infoUser").role);
    return checkToken && checkRole;
  }

  logout() {
    this.localStorageService.remove("tokenUser");
    this.localStorageService.remove("infoUser");
    this.router.navigateByUrl("/");
  }

}
