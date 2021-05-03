import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { CONFIGS } from "../configs/settings.config";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private welcomeMassageURL = CONFIGS.HOST;
  private loginURL = CONFIGS.HOST + "users/login";
  private registerURL = CONFIGS.HOST + "users/register";

  constructor(private http: HttpClient) { }

  getWelcomeMessage(){
    return this.http.get<any>(this.welcomeMassageURL);
  }

  login(user: any){
    return this.http.post<any>(this.loginURL, user);
  }

  register(user: any){
    return this.http.post<any>(this.registerURL, user);
  }

}
