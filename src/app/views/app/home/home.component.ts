import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { TestService } from "../../../shared/test.service";
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  allUser: Observable<User[]>;

  hashPasswword: string = null;
  constructor(
    private notifications: NotificationsService,
    private test: TestService
  ) {

  }
  ngAfterViewInit(): void {
    this.notifications.error(
      'hello',
      'content',
      {
        timeOut: 30000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
      }
    );
  }


  ngOnInit(): void {
    this.test.getAllUser()
      .subscribe(res => {
        this.allUser = res['users'];
      });
  }

  onTest(user: User) {
    try {
      this.notifications.create(
        user.fullName,
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
