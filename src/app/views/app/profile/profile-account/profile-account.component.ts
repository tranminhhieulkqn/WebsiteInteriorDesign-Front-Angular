import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TabsetComponent } from 'ngx-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UploadService } from 'src/app/shared/upload.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment.prod';

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
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  // the user needs to display
  userAuthorized: firebase.User;
  userAuthorizedInfo: User = {} as User;
  userAuthorizedInfo_: User;
  social = {} as Social;

  //
  isEditing = false;


  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService,
    private uploadService: UploadService,
  ) {

  }


  //////////////////////////////////// Tab Profile

  /** OnInit: get all the data needed for the page from the server  */
  ngOnInit() {
    // get user authorized
    this.userAuthorized = this.authService.user;
    // get info user
    // this.getUserAuthorizedInfo(this.userAuthorized.uid);
    this.userService.getUser(this.userAuthorized.uid)
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
    this.bucketPath = `users/${this.userAuthorized.uid}/`;
    this.oldAvatar = this.userAuthorized.photoURL;
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
          err => {},
          () => {
            this.isEditing = false;
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

  //////////////////////////////////// Tab Upload

  //#region /** Configuration for dropzone: apiUrl, tempplate,... */

  // upload api url
  uploadApiUrl = `${environment.apiBackUrl}upload/image`;
  // preview image template upload
  previewTemplate = `
  <div class="dz-preview dz-file-preview mb-3">
    <div class="d-flex flex-row ">
      <div class="p-0 w-30 position-relative">
        <div class="dz-error-mark">
          <span><i></i></span>
        </div>
        <div class="dz-success-mark">
          <span><i></i></span>
        </div>
        <div class="preview-container">
          <img data-dz-thumbnail class="img-thumbnail border-0" />
          <i class="simple-icon-doc preview-icon"></i>
        </div>
      </div>
      <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
        <div>
          <span data-dz-name></span>
        </div>
        <div class="text-primary text-extra-small" data-dz-size>
          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress>
            </span>
          </div>
          <div class="dz-error-message">
            <span data-dz-errormessage></span>
          </div>
        </div>
      </div>
      <a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a>
    </div>
  </div>
  `
  // path to save on server
  bucketPath: string;

  // configuration for dropzone avatar
  configAvatar: DropzoneConfigInterface = {
    url: this.uploadApiUrl,
    method: 'POST',
    acceptedFiles: 'image/*',
    maxFiles: 1,
    maxFilesize: 2,
    paramName: 'image',
    previewTemplate: this.previewTemplate,
  };

  //#endregion

  newAvatar: string;
  oldAvatar: string;

  checkAvatar(form: NgForm) {
    // return !this.thumbnail?.length && form.submitted;
  }

  //#region /** Configuration for DropZone */

  // event for dropzone
  onSending(event): void {
    // get formData
    const formData = event[2];
    // add parameter for formData
    formData.append('bucketPath', this.bucketPath);
  }

  // event for upload error
  onUploadError(event) {
    // show message
    this.notifications.create(
      `Upload failed!`,
      event[1],
      NotificationType.Error,
      {
        theClass: 'error',
        timeOut: 3000,
        pauseOnHover: true,
        showProgressBar: true,
        clickToClose: true
      });
  }

  // event for upload success
  onUploadSuccess(event) {
    // show message
    this.notifications.create(
      `Upload successful!`,
      `Image uploaded successfully.`,
      NotificationType.Success,
      {
        theClass: 'success',
        timeOut: 3000,
        pauseOnHover: true,
        showProgressBar: true,
        clickToClose: true
      });
  }

  // onUploadSuccess for avatar
  onUploadSuccessAvatar(event) {
    this.onUploadSuccess(event);
    // get link image for thumbnail
  }

  // onRemovedFile with thumbnail
  onRemovedFileAvatar(event) {
    // get response
    let response = JSON.parse(event.xhr.response);
    // delete image
    this.uploadService.deleteFile(response.imageURL).subscribe();
  }

  //#endregion

}
