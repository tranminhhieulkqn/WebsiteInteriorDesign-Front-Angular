import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class MakeAppointmentComponent implements OnInit {

  userCurrent = {} as firebase.User;
  designerID: string = '';
  designerInfo = {} as User;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.getParamFromURL()
  }

  ngOnInit(): void {
    this.getUserCurrent()
    this.getDesignerInfo()
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

  getDesignerInfo() {
    this.userService.getUser(this.designerID)
      .subscribe(
        (next) => this.designerInfo = next['user'],
        (error) => console.log(error),
        () => { } // complete
      )
  }

}
