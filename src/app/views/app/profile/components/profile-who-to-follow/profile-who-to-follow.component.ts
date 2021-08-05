import { Component, OnInit } from '@angular/core';
import follow, { IFollow } from 'src/app/data/follow';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile-who-to-follow',
  templateUrl: './profile-who-to-follow.component.html'
})
export class ProfileWhoToFollowComponent implements OnInit {
  data: IFollow[] = follow.slice(0, 5);

  recommendedDesigners = [] as User[];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getRecommendedDesigner();
  }

  getRecommendedDesigner() {
    this.userService.getRecommendedDesigner(this.authService.user.uid.toString(), 5)
      .subscribe(
        (next) => {
          this.recommendedDesigners = next['designers']
        },
        (error) => { },
        () => { }
      )
  }

}
