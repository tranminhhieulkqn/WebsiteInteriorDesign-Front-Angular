import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html'
})
export class ProfileAccountComponent implements OnInit {

  // the user needs to display
  userAuthorized: firebase.User;
  userAuthorizedInfo: User;

  //
  isEditing = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // initialize empty if undefined
    if (!this.userAuthorizedInfo) {
      this.userAuthorizedInfo = {} as User;
    }
  }

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
            console.log(this.userAuthorizedInfo)
            console.log(this.userAuthorizedInfo.displayName)
          }
        },
        err => {
          // log to console
        }
      )
  }

  addTagFn(addedName) {
    return { name: addedName, tag: true };
  }

  onSearchChange(searchValue: string): void {
    console.log(this.userAuthorizedInfo);
  }

}
