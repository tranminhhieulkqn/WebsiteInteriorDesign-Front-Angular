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
  userAuthorizedInfo_: User = {} as User;

  tabset = [
    { id: 0, name: "avatar" },
    { id: 1, name: "avatar" },
    { id: 2, name: "avatar" },
  ]

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

  ) { }

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
          }
        },
        err => {
          // log to console
        }
      )
  }

}
