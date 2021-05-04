import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../services/authentication.service";
import { LocalStorageService } from "../../../services/local-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(formLogin: any) {
    this.authenticationService.login(formLogin.value)
      .subscribe(
        res => {
          console.log(res);
          this.localStorageService.set("tokenUser", res.token);
          this.localStorageService.setObject("infoUser", res.infoUser)
          this.router.navigateByUrl("/");
        },
        err => console.log(err)
      )
  }

}
