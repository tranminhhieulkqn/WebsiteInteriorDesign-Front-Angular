import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

interface Social {
  facebook?: string;
  instagram?: string;
  twitter?: string;
};

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html'
})
export class ProfileAccountComponent implements OnInit {

  // the user needs to display
  userAuthorized: firebase.User;
  userAuthorizedInfo = {} as User;
  userAuthorizedInfo_: User;
  social = {} as Social;

  //
  isEditing = false;
  background_color = "#18191B"

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService,
  ) {

  }

   /** OnInit: get all the data needed for the page from the server  */
  ngOnInit() {
    // get user authorized
    this.userAuthorized = this.authService.user;
    // get info user
    this.getUserAuthorizedInfo(this.userAuthorized.uid);
  }

  getUserAuthorizedInfo(uID: string | number) {
    // get user ahthorized information
    this.userService.getUser(uID)
      .subscribe(
        res => {
          if (res) {
            this.userAuthorizedInfo = res['user'];
            this.userAuthorizedInfo_ = Object.assign({}, this.userAuthorizedInfo);
            console.log(this.userAuthorizedInfo);
          }
        },
        err => {
          // log to console
        }
      )
  }

  addTagFn(addedName) {
    return addedName;
  }

  onSearchChange(searchValue: string): void {
    this.isEditing = !this.isEditing;
    console.log(this.userAuthorizedInfo);
  }

  // All event click
  clickEditButton() {
    this.isEditing = true;
  }

  // submit to update
  clickSubmitButton(form: NgForm) {
    if (form.valid) {
      let user = form.value as User;
      user.birthDate = new Date(user.birthDate).toLocaleString().split(',')[0];
      console.log(user)
      this.userService.updateUser(user)
        .subscribe(
          () => {
            this.notifications.create(
              "Successfully updated",
              `Your information has been successfully updated on the system.`,
              NotificationType.Success,
              {
                theClass: 'primary',
                timeOut: 2000,
                pauseOnHover: true,
                showProgressBar: true,
                clickToClose: true
              });
          }
        )
    }
  }

  clickCancelButton() {
    this.userAuthorizedInfo = Object.assign({}, this.userAuthorizedInfo_);
    this.isEditing = false;
    this.notifications.create(
      "Cancel",
      `Cancel successfully!`,
      NotificationType.Bare,
      {
        theClass: 'primary',
        timeOut: 1000,
        showProgressBar: true,
        clickToClose: true
      });
  }

  // check validation
  checkValidation(value: NgModel, form: NgForm) {
    return (this.isEditing) ? !value.valid && form.submitted : this.isEditing;
  }

}
