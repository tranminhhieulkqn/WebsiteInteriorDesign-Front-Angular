import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(formLogin: any){
    this.authenticationService.login(formLogin.value)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
