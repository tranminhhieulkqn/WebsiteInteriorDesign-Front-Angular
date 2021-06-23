import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm: NgForm;
  buttonDisabled = false;
  buttonState = '';

  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private router: Router,
    private zone: NgZone,
  ) {

  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.registerForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.register(this.registerForm.value).subscribe(
      (res) => {

      },
      (err) => {
        this.buttonDisabled = false;
        this.buttonState = '';
        // show notification error
        this.notifications.create(
          'Error',
          err.message,
          NotificationType.Bare,
          { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
        );
      },
      () => { // complete
        this.buttonDisabled = false;
        this.buttonState = '';
        // show notice that an account is being created and redirected
        this.notifications.create(
          'Done',
          'Please check your registered email to verify your account. You will be redirected to the login page...',
          NotificationType.Success,
          { theClass: 'outline primary', timeOut: 6000, showProgressBar: true }
        );
        // set the time to turn pages and automatically fill in the password
        setTimeout(() => {
          let params = new HttpParams()
            .set('email', this.registerForm.value.email.toString())
          // redirect to login page with email
          this.zone.run(() => {
            this.router.navigate([`user/login`], { queryParams: { email: this.registerForm.value.email.toString() } });
          });
        }, 6000);
      });
  }
}
