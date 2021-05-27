import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  oobCode = ""

  buttonDisabled = false;
  buttonState = '';

  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.oobCode = params['oobCode'];
    });
  }

  onSubmit() {
    if (!this.resetForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.resetPassword(this.resetForm.value).subscribe(() => {
      // show notification reset password successfully
      this.notifications.create(
        'Done',
        'Password reset completed, you will be redirected to Login page!',
        NotificationType.Bare,
        { theClass: 'outline primary', timeOut: 6000, showProgressBar: true }
      );
      this.buttonDisabled = false;
      this.buttonState = '';
      // set time out to redirect to login page
      setTimeout(() => {
        this.router.navigate(['user/login']);
      }, 6000);
    }, (error) => {
      this.buttonDisabled = false;
      this.buttonState = '';
      // show notification error
      this.notifications.create(
        'Error',
        error.message,
        NotificationType.Bare,
        { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
      );
    });
  }
}
