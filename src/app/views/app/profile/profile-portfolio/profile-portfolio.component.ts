import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isThisSecond } from 'date-fns';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile-portfolio',
  templateUrl: './profile-portfolio.component.html'
})
export class ProfilePortfolioComponent implements OnInit {

  // the user needs to display
  userAuthorized: firebase.User;
  userAuthorizedInfo: User = {} as User;

  userIDCurrent: string;

  loading: boolean = true;

  //
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.userIDCurrent = this.userAuthorized.uid;
  }

  ngOnInit() {
    // get user authorized
    this.userAuthorized = this.authService.user;
    this.userIDCurrent = this.userAuthorized.uid;
    this.route.queryParams.subscribe(
      (params) => {
        this.userIDCurrent = params.id || this.userIDCurrent;
        // get info user
        // this.getUserAuthorizedInfo(this.userAuthorized.uid);
        this.userService.getUser(this.userIDCurrent)
          .subscribe(
            (res) => {
              if (res['success']) {
                this.userAuthorizedInfo = res['user'];
              }
            },
            (err) => {
              // log to console
            }
          )
      },
      (err) => { },
      () => { } // complete
    );

    this.loading = false;
  }


}
