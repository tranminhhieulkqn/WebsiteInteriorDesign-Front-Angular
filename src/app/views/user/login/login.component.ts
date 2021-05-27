import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = 'tranminhhieulkqn@gmail.com';
  passwordModel = 'Hieu@123';

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
      this.emailModel = params['email'];
      this.passwordModel = params['password'];
    });
  }

  onSubmit() {
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.signIn(this.loginForm.value).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        // show notification error
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notifications.create(
          'Error',
          error.message,
          NotificationType.Bare,
          { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
        );
      });
  }
}
