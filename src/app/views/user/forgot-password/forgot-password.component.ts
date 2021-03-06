import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('passwordForm') passwordForm: NgForm;
  buttonDisabled = false;
  buttonState = '';

  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.passwordForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.sendPasswordEmail(this.passwordForm.value.email).subscribe((answer) => {
    }, (error) => {
      // show notification error
      this.notifications.create(
        'Error',
        error.message,
        NotificationType.Bare,
        { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
      );
      this.buttonDisabled = false;
      this.buttonState = '';
    }, () => {
      // show notification success
      this.notifications.create(
        'Done',
        'Password reset email is sent, please check your email to reset password!',
        NotificationType.Bare,
        { theClass: 'outline primary', timeOut: 6000, showProgressBar: true });
      this.buttonDisabled = false;
      this.buttonState = '';
      // set time out and redirect
      setTimeout(() => {
        // this.router.navigate(['user/reset-password']);
        this.router.navigate(['user/login']);
      }, 6000);
    });
  }

}
