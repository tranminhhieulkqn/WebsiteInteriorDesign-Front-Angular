import { JsonPipe } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { User } from "../../../models/user.model";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(formRegister: any){
    delete formRegister.value.cfpassword
    this.authenticationService.register(formRegister.value)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }

}
