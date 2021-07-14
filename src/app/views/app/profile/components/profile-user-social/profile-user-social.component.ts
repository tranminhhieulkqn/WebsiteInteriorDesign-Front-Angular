import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-user-social',
  templateUrl: './profile-user-social.component.html'
})
export class ProfileUserSocialComponent implements OnInit {
  @Input() user = {} as User;

  constructor(private lightbox: Lightbox) { }

  ngOnInit() {
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }
}
