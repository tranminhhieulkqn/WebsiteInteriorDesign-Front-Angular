import { Component, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/shared/upload.service';
import { UserService } from 'src/app/shared/user.service';

interface Social {
  facebook?: string;
  instagram?: string;
  twitter?: string;
};

@Component({
  selector: 'app-profile-account-infor',
  templateUrl: './profile-account-infor.component.html'
})

export class ProfileAccountInforComponent implements OnInit {
  @Input() userAuthorizedInfo: User;
  @Input() userAuthorizedInfo_: User;
  social = {} as Social;

  isEditing = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {

  }

  addTagFn(addedName) {
    return addedName;
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
          },
          err => { },
          () => {
            this.isEditing = false;
          }
        )
    }
  }

  clickCancelButton() {
    this.userAuthorizedInfo = Object.assign({}, this.userAuthorizedInfo_) as User;
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
