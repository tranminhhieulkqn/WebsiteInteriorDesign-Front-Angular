import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {

  oobCode: string = "";
  buttonState: string = "";

  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this.route.queryParams.subscribe(params => {
      this.oobCode = params['oobCode'];
    });
    if (this.oobCode) {
      this.buttonState = 'show-spinner'
      this.authService.verifyingEmail(this.oobCode)
        .subscribe(
          res => { },
          err => { },
          () => { // complete
            this.buttonState = '';
            // show notice that an account is being created and redirected
            this.notifications.create(
              'Verification complete!',
              'Your email verification is complete, I will redirect you to the login page...',
              NotificationType.Success,
              { theClass: 'outline primary', timeOut: 6000, showProgressBar: true }
            );
            // set the time to turn pages
            setTimeout(() => {
              // redirect to login page
              this.zone.run(() => { this.router.navigateByUrl(`user/login`); });
            }, 6000);
          }
        )
    }
  }

  ngOnInit(): void {

  }

}
