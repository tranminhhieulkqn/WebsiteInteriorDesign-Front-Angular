import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile-social',
  templateUrl: './profile-social.component.html'
})
export class ProfileSocialComponent implements OnInit {

  // the user needs to display
  userAuthorized: firebase.User;
  userAuthorizedInfo: User = {} as User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userAuthorized = this.authService.user
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUser(this.userAuthorized.uid.toString())
      .subscribe(
        (next) => {
          this.userAuthorizedInfo = next['user']
        },
        (error) => console.log(error),
        () => { } // complete
      )
  }

}
