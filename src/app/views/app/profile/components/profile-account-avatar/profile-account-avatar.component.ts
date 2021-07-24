import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UploadService } from 'src/app/shared/upload.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile-account-avatar',
  templateUrl: './profile-account-avatar.component.html',
})
export class ProfileAccountAvatarComponent implements OnInit {

  // References to the dropzone component
  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
  dropzone: any;

  @Input() userAuthorized: firebase.User;
  @Input() userAuthorizedInfo: User;

  /** Lifecycle hook that is called after a this component's view has been fully initialized */
  ngAfterViewInit() {
    // Get a reference ot the dropzone component
    this.dropzone = this.componentRef.directiveRef.dropzone();
  }

  newAvatar: string = '';
  oldAvatar: string = '';
  isSaved: boolean = false;
  defaultAvatarProfile: string = `https://storage.googleapis.com/interior-design-afc76.appspot.com/assets/users/default-avatar-profile.jpg`

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private uploadService: UploadService,
    private notifications: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.bucketPath = `users/${this.userAuthorized.uid}/`;
    this.oldAvatar = this.userAuthorized.photoURL;
  }

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


  //#region /** Method event for DropZone */

  // check form with dropzone
  checkAvatar(form: NgForm) {
    return !this.newAvatar?.length && form.submitted;
  }

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
    // remove url image if upload failed
    this.newAvatar = '';
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
    // try change avatar to demo for user
    this.newAvatar = event[1].imageURL;
    this.userAuthorizedInfo.avatarURL = this.newAvatar;
  }

  // onRemovedFile with thumbnail
  onRemovedFileAvatar(event) {
    try {
      // if avatar new exists, remove and give value = null
      if (this.newAvatar.length) {
        // get response
        let response = JSON.parse(event.xhr.response);
        // delete image on database
        this.uploadService.deleteFile(response.imageURL).subscribe();
      }
      // try give value = null with newAvatar
      this.newAvatar = ''
      this.userAuthorizedInfo.avatarURL = this.oldAvatar;
    } catch (error) { }
    // show message
    this.notifications.create(
      `Deleted successfully!`,
      `Deleted uploaded photos successfully!`,
      NotificationType.Success,
      {
        theClass: 'success',
        timeOut: 3000,
        pauseOnHover: true,
        showProgressBar: true,
        clickToClose: true
      });
  }

  //#endregion


  //#region /** With submit form to update avatar */

  // event submit new avartar
  clickSubmitButton(form: NgForm) {
    if (this.newAvatar?.length && this.newAvatar != this.oldAvatar) {
      this.authService.updateProfile(this.newAvatar, this.authService.user.displayName)
        .subscribe(
          (res) => {
            this.userService.updateUser({
              avatarURL: this.newAvatar,
              email: this.authService.user.email
            } as User)
              .subscribe()
          },
          (err) => { },
          () => {
            if (this.oldAvatar != this.defaultAvatarProfile)
              this.uploadService.deleteFile(this.oldAvatar).subscribe(
                () => { },
                () => { },
                () => {
                  this.componentRef.directiveRef.reset();
                }
              );
            else {
              this.componentRef.directiveRef.reset();
            }
            this.oldAvatar = this.newAvatar;
            this.userAuthorizedInfo.avatarURL = this.newAvatar;
            this.newAvatar = '';
            this.isSaved = true;
            // show message
            this.notifications.create(
              `Update your avatar successfully!`,
              `Your new profile picture has been updated!`,
              NotificationType.Success,
              {
                theClass: 'success',
                timeOut: 3000,
                pauseOnHover: true,
                showProgressBar: true,
                clickToClose: true
              });
          }
        );
    }
    else {
      this.notifications.create(
        `Warning!`,
        `Please check your profile picture before updating!`,
        NotificationType.Warn,
        {
          theClass: 'infor',
          timeOut: 3000,
          pauseOnHover: true,
          showProgressBar: true,
          clickToClose: true
        });
    }
  }

  //#endregion


  //#region /** Handling exceptions */

  // function remove image if not save
  removeImageIfNotSaved() {
    if (!this.isSaved && this.newAvatar.length > 0) { // if flag savedPost not true and has url new image
      this.uploadService.deleteFile(this.newAvatar).subscribe();
    }
    this.componentRef.directiveRef.reset();
  }

  // handle with reload page
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event): void {
    console.log("Processing beforeunload...");
    this.removeImageIfNotSaved()
  }

  // handle with close page
  @HostListener('window:beforeunload', ['$event']) onWindowClose(event: Event): void {
    console.log("Processing beforeunload...");
    this.removeImageIfNotSaved()
  }

  //#endregion

}
