import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class MakeAppointmentComponent implements OnInit {

  userCurrent = {} as firebase.User;
  designerID: string = '';
  designerInfo = {} as User;
  userCurrentInfo = {} as User;
  form: FormGroup;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  basicTime = new Date();
  bsInlineValue = new Date();
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    // private localeService: BsLocaleService
  ) {
    this.getParamFromURL()
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

  }

  ngOnInit(): void {
    this.getUserCurrent()
    this.getDesignerInfo()
    this.getUserCurrentInfo()
    this.form = new FormGroup({
      basicDate: new FormControl(new Date()),
    });
  }

  getUserCurrent() {
    this.userCurrent = this.authService.user;
  }

  getParamFromURL() {
    this.route.queryParams.subscribe(
      (next) => this.designerID = next['id'],
      (error) => console.log(error),
      () => { } // complete
    )
  }

  getUserCurrentInfo() {
    this.userService.getUser(this.userCurrent.uid.toString())
      .subscribe(
        (next) => {
          console.log(next)
          this.userCurrentInfo = next['user']
        },
        (error) => console.log(error),
        () => { } // complete
      )
  }
  getDesignerInfo() {
    this.userService.getUser(this.designerID)
      .subscribe(
        (next) => {
          console.log(next)
          this.designerInfo = next['user']
          this.designerInfo.email = this.emailHidden(this.designerInfo.email)
          this.designerInfo.phone = this.haftHidden(this.designerInfo.phone)
        },
        (error) => console.log(error),
        () => { } // complete
      )
  }

  haftHidden(string: string) {
    var len = string.length;
    return string.substring(0, len / 2).padEnd(len, "*")
  }

  emailHidden(string: string) {
    let emailSplit = string.split('@')
    emailSplit[0] = this.haftHidden(emailSplit[0])
    return emailSplit[0] + "@" + emailSplit[1]
  }


}
