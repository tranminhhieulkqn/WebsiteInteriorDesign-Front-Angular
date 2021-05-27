import { Component, OnInit, ViewChild } from '@angular/core';
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
    private router: Router
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
      () => {
        // show notice that an account is being created and redirected
        this.notifications.create(
          'Done',
          'Your account is creating, Please wait a moment you will be redirected to the login page!',
          NotificationType.Success,
          { theClass: 'outline primary', timeOut: 6000, showProgressBar: true }
        );
        // set the time to turn pages and automatically fill in the password
        setTimeout(() => {
          let params = new HttpParams()
            .set('email', this.registerForm.value.email.toString())
            .set('password', this.registerForm.value.password.toString());
          console.log(params.toString());
          // redirect to login page with email with password
          this.router.navigate([`user/login`],
            {
              queryParams:
              {
                email: this.registerForm.value.email.toString(),
                password: this.registerForm.value.password.toString()
              }
            });
        }, 6000);
      },
      (error) => {
        // show notification error
        this.notifications.create(
          'Error',
          error.message,
          NotificationType.Bare,
          { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
        );
        this.buttonDisabled = false;
        this.buttonState = '';
      });
  }
}
