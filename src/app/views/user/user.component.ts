import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2) {
    try {
      this.route.queryParams.subscribe(params => {
        switch (params.mode) {
          case "resetPassword":
            this.router.navigate([`user/reset-password`], { queryParams: params });
            break;

          case "verifyEmail":
            this.router.navigate([`user/verify-email`], { queryParams: params });
            break;

          default:
            break;
        }
      });
    } catch (error) {

    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'background');
    this.renderer.addClass(document.body, 'no-footer');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'background');
    this.renderer.removeClass(document.body, 'no-footer');
  }
}
