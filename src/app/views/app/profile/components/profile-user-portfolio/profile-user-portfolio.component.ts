import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-user-portfolio',
  templateUrl: './profile-user-portfolio.component.html'
})
export class ProfileUserPortfolioComponent implements OnInit {
  @Input() user = {} as User;

  constructor(private lightbox: Lightbox) {

  }

  ngOnInit() {
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }
}
