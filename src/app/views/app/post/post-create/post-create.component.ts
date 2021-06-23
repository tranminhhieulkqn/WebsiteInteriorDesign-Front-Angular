import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';

import { environment } from 'src/environments/environment.prod';
import { EditorChangeContent, EditorChangeSelection, QuillModules } from "ngx-quill";
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { delay } from 'rxjs/operators';
import { UploadService } from 'src/app/shared/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})

export class PostCreateComponent implements OnInit {

  //#region /** Variable definition */

  userAuthorized: firebase.User;
  newPost: Post;
  postID?: string = "";
  publicPost: boolean = false;
  savedPost: boolean = false; // check post saved

  //#endregion

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

  // configuration for dropzone thumbnail
  configThumbnail: DropzoneConfigInterface = {
    url: this.uploadApiUrl,
    method: 'POST',
    acceptedFiles: 'image/*',
    maxFiles: 1,
    maxFilesize: 2,
    paramName: 'image',
    previewTemplate: this.previewTemplate,
  };

  // configuration for dropzone gallery
  configGallery: DropzoneConfigInterface = {
    url: this.uploadApiUrl,
    method: 'POST',
    acceptedFiles: 'image/*',
    maxFilesize: 2,
    paramName: 'image',
    previewTemplate: this.previewTemplate,
  };

  //#endregion

  /** Constructor: get all service and module */

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private notifications: NotificationsService,
    private localStorageService: LocalStorageService,
    private uploadService: UploadService,
    private router: Router,
  ) {
    // get user authorized
    this.userAuthorized = this.authService.user;
    // define new post local
    this.newPost = {
      authorID: this.authService.user.uid,
      title: "My Post",
      content: ``
    } as Post;
    // create new draft post to has postID and
    this.postService.addPost(this.newPost)
      .subscribe(
        res => {
          this.newPost = res['post'] as Post;
          this.postID = res['post'].pid;
          // after has postID, define the bucketPath
          this.bucketPath = `posts/${this.postID}/`
        },
        er => {
          // Error
        }
      )
  }

  //#region /** Lifecycle Hooks: define all needed lifecycle hooks */

  // ngOnInit
  ngOnInit(): void {

  }

  // ngOnDestroy
  ngOnDestroy() {
    this.removePostIfNotSaved()
  }

  //#endregion


  //#region /** Configuration for ng-select */

  // add new tag to input
  addTagFn(addedName) {
    return addedName;
  }

  //#endregion


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

  // onUploadSuccess for gallery
  onUploadSuccessGallery(event) {
    this.onUploadSuccess(event);
    // append link image to gallary
    this.newPost.gallery.push(event[1].imageURL);
  }

  // onUploadSuccess for thumbnail
  onUploadSuccessThumbnail(event) {
    this.onUploadSuccess(event);
    // get link image for thumbnail
    this.newPost.thumbnail = event[1].imageURL;
  }

  // onRemovedFile with gallery
  onRemovedFileGallery(event) {
    // get response
    let response = JSON.parse(event.xhr.response);
    // delete image
    if (!this.savedPost)
      this.uploadService.deleteFile(response.imageURL).subscribe();
    // remove file on gallery
    try {
      this.newPost.gallery.slice(this.newPost.gallery.indexOf(response.imageURL), 1);
    } catch (error) { }
  }

  // onRemovedFile with thumbnail
  onRemovedFileThumbnail(event) {
    // get response
    let response = JSON.parse(event.xhr.response);
    // delete image
    if (!this.savedPost)
      this.uploadService.deleteFile(response.imageURL).subscribe();
    // remove file on thumbnail
    if (this.newPost.thumbnail == response.imageURL) {
      this.newPost.thumbnail = "";
    }
  }

  //#endregion


  //#region

  // check validation
  checkValidation(value: NgModel, form: NgForm) {
    return !value.valid && form.submitted;
  }
  // check validation editor
  checkEditor(form: NgForm) {
    return !this.newPost.content?.length && form.submitted;
  }

  checkGallery(form: NgForm) {
    return !this.newPost.gallery?.length && form.submitted;
  }

  checkThumbnail(form: NgForm) {
    return !this.newPost.thumbnail?.length && form.submitted;
  }

  // check event editor
  onEditorChanged(quill: EditorChangeContent | EditorChangeSelection) {
    // check editor changed
    // console.log(quill);
  }



  clickSubmitButton(form: NgForm) {
    if (
      this.newPost.title?.length > 0 &&
      this.newPost.category?.length > 0 &&
      this.newPost.keywords?.length > 0 &&
      this.newPost.content?.length > 0 &&
      this.newPost.thumbnail?.length > 0 &&
      this.newPost.gallery?.length > 0
    ) {
      // change and delete needed value
      this.newPost.status = form.value.status ? `public` : `private`;
      // add date created for post
      this.newPost.dateCreated = new Date();
      console.log(this.newPost.dateCreated);

      delete this.newPost.author;
      delete this.newPost['pid']
      delete this.newPost['createdAt'];
      delete this.newPost['updatedAt'];
      // update post to server
      this.postService.updatePost(this.postID, this.newPost).subscribe(
        res => { },
        err => { },
        () => {
          this.savedPost = true;
          // show message
          this.notifications.create(
            'Done',
            'Your post is creating, Please wait a moment you will be redirected to the home page!',
            NotificationType.Success,
            { theClass: 'outline primary', timeOut: 3000, showProgressBar: true }
          );
          // set the time to turn pages
          setTimeout(() => this.router.navigate([`app/home`]), 3000);
        }
      );
    }
    else {
      // show message
      this.notifications.create(
        `Some information is missing!`,
        `Please fill in all the information of the post.`,
        NotificationType.Info,
        {
          theClass: 'info',
          timeOut: 3000,
          pauseOnHover: true,
          showProgressBar: true,
          clickToClose: true
        });
    }
  }

  //#region /** Handling exceptions */

  // function remove all image anh post
  removePostIfNotSaved() {
    if (!this.savedPost) { // if flag savedPost not true
      // delete all image to upload
      if (this.newPost.thumbnail) {
        this.uploadService.deleteFile(this.newPost.thumbnail).subscribe();
      }
      this.newPost.gallery.forEach(image => {
        this.uploadService.deleteFile(image).subscribe();
      });
      // delete draft post
      this.postService.deletePost(this.postID.toString()).subscribe()
    }
  }

  // handle with reload page
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event): void {
    console.log("Processing beforeunload...");
    this.removePostIfNotSaved()
  }

  // handle with close page
  @HostListener('window:beforeunload', ['$event']) onWindowClose(event: Event): void {
    console.log("Processing beforeunload...");
    this.removePostIfNotSaved()
  }

  //#endregion

}
