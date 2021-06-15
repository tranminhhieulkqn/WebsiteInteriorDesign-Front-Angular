import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html'
})
export class PostContentComponent implements OnInit {

  constructor(private lightbox: Lightbox) { }

  ngOnInit() {
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }

}
