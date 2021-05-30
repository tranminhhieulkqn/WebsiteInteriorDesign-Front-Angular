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
  userIDCurrent: string = null;
  userCurrent: Observable<User>;
  userAuthorized: firebase.User;

  displayName: string;
  loading: boolean = true;

  //
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.userIDCurrent = params.id || undefined);
    if (this.userIDCurrent)
      this.userService.getUser(this.userIDCurrent)
        .subscribe(
          res => {
            if (!res){
              this.router.navigate([`error`]);
            }
            this.displayName = res['user'].fullName;
          }
        )
    this.loading = false;
  }


}
