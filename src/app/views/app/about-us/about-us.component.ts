import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap';
import { Lightbox } from 'ngx-lightbox';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
  ],
})
export class AboutUsComponent implements OnInit {

  slides = [
    { image: 'https://c.stocksy.com/a/Vhb300/z9/859909.jpg', text: 'First' },

  ];
  noWrapSlides = false;
  showIndicator = true;
  // data: IFaq[] = faqData;
  showItemIndex = 0;
  members = [
    {
      displayName: "Ph.D Bao Nguyen Thien",
      avatarURL: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fmembers%2Fbaonguyenthien.jpg?alt=media&token=c95e7a26-5def-403e-9dc7-15e364fc120c',
      about: `
      <div>
      <ul style="list-style-type: circle;">
      <li>Lecturer to guide the implementation of the project.</li>
      <li>Lecturer at HCMUTE.</li>
      <li>CEO of HBB Solution.</li>
      </ul>
      </div>
      `,
      tags: ['Instructor']
    },
    {
      displayName: "Hieu Tran Minh",
      avatarURL: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fmembers%2Ftranminhhieu.png?alt=media&token=ba94a273-fe7d-48e4-b700-f3c94eae503e',
      about: `
      <ul style="list-style-type: circle;">
      <li>Student' ID : 17110135.</li>
      <li>Student at HCMUTE.</li>
      <li>Student doing this project.</li>
      </ul>
      `,
      tags: ['Student', 'Project builder']
    },
    {
      displayName: "Viet Pham Quoc",
      avatarURL: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fmembers%2Fvietphamquoc.jpg?alt=media&token=8fc0ded6-880d-4d69-9f82-e419bc61b0de',
      about: `
      <ul style="list-style-type: circle;">
      <li>Student'ID : 17110254.</li>
      <li>Student at HCMUTE.</li>
      <li>Student doing this project.</li>
      </ul>
      `,
      tags: ['Student', 'Project builder']
    }
  ] as User[];

  constructor(
    private lightbox: Lightbox
  ) { }

  ngOnInit(): void {
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }

}
