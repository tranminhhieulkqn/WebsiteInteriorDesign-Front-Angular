import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { TestService } from "../../../shared/test.service";
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthService } from 'src/app/shared/auth.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 2000, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  userCurrent: any;
  allUser: User[] = [];
  displayName = '';
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  hashPasswword: string = null;
  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private test: TestService
  ) {

  }
  ngAfterViewInit(): void {
    this.notifications.create(
      `Hello ${this.displayName}`,
      'content',
      NotificationType.Info,
      {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false
      }
    );
  }


  ngOnInit(): void {
    if (this.authService.user) {
      this.displayName = this.authService.user.displayName;
    }
    this.userCurrent = this.authService.userCurrent$;
    this.test.getAllUser()
      .subscribe(res => {
        this.allUser = res['users'];
        console.log(this.allUser)
      });
  }

  onTest(user: User) {
    try {
      this.notifications.create(
        user.displayName,
        `Email: ${user.email}`,
        NotificationType.Success,
        {
          theClass: 'primary',
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
    } catch (error) {
      console.error(error);
    }

  }
}
